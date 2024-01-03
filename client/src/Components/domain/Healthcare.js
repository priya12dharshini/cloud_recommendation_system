import React, { useState } from 'react'
import axios from 'axios';
import './domain.css'


export default function Healthcare() {
  const [hformData, setHFormData] = useState({
    qn1: [],
    qn2: '',
    qn3: '',
    qn4: '',
    qn5: '',
    qn6: '',
    qn7: [],
    qn8: '',
    qn9: '',
    qn10: '',
  });

  const handleCheckboxChange = (event, question) => {
    const value = event.target.value;
    const updatedhFormData = { ...hformData, [question]: [...hformData[question], value] };
    setHFormData(updatedhFormData);
  };

  const handleTextChange = (event, question) => {
    const value = event.target.value;
    const updatedhFormData = { ...hformData, [question]: value };
    setHFormData(updatedhFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Form Data:', hformData);
  
      const response = await axios.post('http://localhost:8000/api/hform/submitHealthcareForm', {
        data: hformData,
      });
  
      console.log(response.data); // Use response.data instead of await response.json();
    } catch (error) {
      console.error(error);
    }
  };
  


  return (
    <div className="fm">
        <form onSubmit={handleSubmit}>
          <center><h1 className="title">Healthcare</h1></center>
            <div className="qns">
              <center><h1>Fill the following</h1></center>
                <label name="qn1"><b>1. What tasks or activities do you want to accomplish using cloud services?</b><br/>
                <input type="checkbox" name="qn1" value="Electronic health record management" 
                onChange={(e) => handleCheckboxChange(e, 'qn1')}  /> Electronic health record management     <br />
                <input type="checkbox" name="qn1" value="Telemedicine and video conferencing" checked={hformData.qn1.includes('Telemedicine and video conferencing')}
                onChange={(e) => handleCheckboxChange(e, 'qn1')} /> Telemedicine and video conferencing <br />
                <input type="checkbox" name="qn1" value="Data storage and backup"  
                onChange={(e) => handleCheckboxChange(e, 'qn1')}/> Data storage and backup <br />
                <input type="checkbox" name="qn1" value="Healthcare mobile apps" 
                onChange={(e) => handleCheckboxChange(e, 'qn1')} /> Healthcare mobile apps <br />
                <input type="checkbox" name="qn1" value="Medical Imaging" 
                onChange={(e) => handleCheckboxChange(e, 'qn1')} /> Medical Imaging <br />
                <input type="checkbox" name="qn1" value="Hosting Website" 
                onChange={(e) => handleCheckboxChange(e, 'qn1')} /> Hosting Website <br />
                </label>
                <label name="qn2"><b>2. Are you looking to enhance the efficiency of appointment scheduling and management?</b><br/>
                <input type="text" name="qn2" value={hformData.qn2}  onChange={(e) => handleTextChange(e, 'qn2')}   /><br />
                </label>
                <label name="qn3"><b>3. Would you like to improve patient engagement and communication?</b><br/>
                <input type="text" name="qn3" value={hformData.qn3}  onChange={(e) => handleTextChange(e, 'qn3')}  /><br />
                </label>
                <label name="qn4"><b>4. Are you interested in enhancing healthcare inventory and supply chain management?</b><br/>
                <input type="text" name="qn4" value={hformData.qn4}   onChange={(e) => handleTextChange(e, 'qn4')} /><br />
                </label>
                <label name="qn5"><b>5. Are you interested in improving healthcare analytics and reporting?  </b><br/>
                <input type="text" name="qn5" value={hformData.qn5}  onChange={(e) => handleTextChange(e, 'qn5')}  /><br />
                </label>
                <label name="qn6"><b>6. Would you like to implement a healthcare chatbot for patient inquiries and support?</b><br/>
                <input type="text" name="qn6" value={hformData.qn6}  onChange={(e) => handleTextChange(e, 'qn6')} /> <br />
                </label>
                <label name="qn7"><b>7. What is the expected geographical distribution of your users?</b><br/>
                <input type="checkbox" name="qn7" value="Local or Regional" 
                onChange={(e) => handleCheckboxChange(e, 'qn7')}  /> Local or Regional <br />
                <input type="checkbox" name="qn7" value="National" 
                onChange={(e) => handleCheckboxChange(e, 'qn7')} /> National <br />
                <input type="checkbox" name="qn7" value="Global"  
                onChange={(e) => handleCheckboxChange(e, 'qn7')}/> Global <br />
                </label>
                <label name="qn8"><b>8. Do you have any existing software?</b><br/>
                <input type="text" name="qn8" value={hformData.qn8} onChange={(e) => handleTextChange(e, 'qn8')}  /><br />
                </label>
                <label name="qn9"><b>9. Would you like to implement patient engagement portals for feedback, reviews, and interaction?  </b><br/>
                <input type="text" name="qn9" value={hformData.qn9} onChange={(e) => handleTextChange(e, 'qn9')} /> <br />
                </label>
                <label name="qn10"><b>10. Do you need a cloud service for remote patient monitoring, early warning systems, and alerts?   </b><br/>
                <input type="text" name="qn10" value={hformData.qn10} onChange={(e) => handleTextChange(e, 'qn10')}  /> <br />
                </label>
                <center><button className="btn1">Submit</button></center>
            </div>
        </form>
    </div>
  )
}

