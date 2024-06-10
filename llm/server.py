from fastapi import FastAPI 
from fastapi.middleware.cors import CORSMiddleware
import requests
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from all origins, you can restrict this if needed
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/getService")
async def llm(input_data: dict):  # Modify the function signature to accept InputData
    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": "Can you please recommend AWS services with description and provide an estimated total monthly cost?" + str(input_data)
                    }
                ]
            }
        ]
    }

    # print(input_data)
    # Define the API URL and API key
    api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    api_key = "AIzaSyAntNnxW9SE1_g035Qm3yIR7vZsmVuEns8"

    # Define headers
    headers = {
        "Content-Type": "application/json"
    }

    # Send the POST request
    response = requests.post(f"{api_url}?key={api_key}", json=data, headers=headers)

    if response:
        response_json = response.json()  # Parse JSON response
        main_content = response_json["candidates"][0]["content"]["parts"][0]["text"]  # Extract main content
        model_response = main_content.replace('*', '')
        print(model_response)
    # Parse the response and generate JSON dynamically
        services = {}
        estimated_monthly_cost = {}
        additional_notes = []
        
        for line in model_response.split('\n'):
            if ":" in line:
                key, value = line.split(":", 1)
                key = key.strip()
                value = value.strip()
                if value != "":
                    if "$" in value:  # Check if value is a cost
                        estimated_monthly_cost[key] = value
                    else:
                        services[key] = value
            elif line.strip() != "":
                additional_notes.append(line.strip())

        # Construct the JSON response with non-empty sections
        json_response = {}

        # Include "AWS Services" if it has values
        if services:
            json_response["AWS Services"] = services

        # Include "Estimated Monthly Cost" if it has values
        if estimated_monthly_cost:
            json_response["Estimated Monthly Cost"] = estimated_monthly_cost

        # Include "Additional Notes" only if it is not empty
        if additional_notes:
            json_response["Additional Notes"] = additional_notes  # Convert dictionary keys to list
        
        step_prompt={
            "contents": [
                {
                    "parts": [
                        {
                            "text": " Describe a detailed,granular step-by-step process for connecting all these AWS services in structured format {step number: - detailed minimum 5 instructions each} and dont include AWS services and estimated monthly cost ,additonaly give me related AWS documents links with title of DocLinks(must) and dont include any word in double quoatation" + str(model_response) 
                        }
                    ]
                }
            ]      
        }
        
        
            # Send the POST request
        complete_res = requests.post(f"{api_url}?key={api_key}", json=step_prompt, headers=headers)
                    
        if complete_res:
            response_json = complete_res.json()
            main_content = response_json["candidates"][0]["content"]["parts"][0]["text"]
            complete_model_response = main_content.replace('*', '')
            steps = {}
            current_step = None
            related_docs = []

            processed_text = re.sub(r'#', '', complete_model_response)
            lines = processed_text.strip().split('\n')
            for line in lines:
                if line.startswith('Step'):
                    current_step = line.strip()
                    if not current_step.startswith('Step-'):
                        steps[current_step] = {}
                elif line.startswith('DocLinks'):
                    current_step = None
                    for doc_link_line in lines[lines.index(line) + 1:]:
                        if not doc_link_line.startswith("-"):
                            break
                        related_doc = doc_link_line.strip("-").strip()
                        if related_doc:
                            related_docs.append(related_doc)
                elif current_step:
                    stripped_line = line.strip()
                    if stripped_line and not stripped_line.startswith("- AWS Services") and not stripped_line.startswith("Estimated Monthly Cost") and not stripped_line.startswith("- Total Estimated Monthly Cost"):
                        if current_step != "Step 1:" or stripped_line != "":
                            if current_step and "Instructions" in steps.get(current_step, {}):
                                steps[current_step]["Instructions"].append(stripped_line.replace("\\", ""))
                            else:
                                steps[current_step]["Instructions"] = [stripped_line.replace("\"", "")]
                else:
                    related_doc = line.strip()
                    if related_doc:
                        related_docs.append(related_doc)


        detailed_steps = {
            "Steps": steps,
            "RelatedDocs": related_docs,
        }
        
        if services and estimated_monthly_cost and detailed_steps:
            json_response = {
                "awsServices": services,
                "estimatedMonthlyCost": estimated_monthly_cost,
                "stepsToConnectAllServices":detailed_steps
            }
            return json_response


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=9000)
