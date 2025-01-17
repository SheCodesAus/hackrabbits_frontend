import React, { useState } from 'react';
import './InvitePage.css';

const InvitePage = () => {
 const [formData, setFormData] = useState({
   fullName: '',
   email: '',
   industry: '',
   currentRole: '', 
   whyInspiring: ''
 });

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData(prevState => ({
     ...prevState,
     [name]: value
   }));
 };

 const handleSubmit = (e) => {
   e.preventDefault();
   console.log(formData);
   // Add your form submission logic here
 };

 return (
   <div>
     <div>
       <h1>Invite - Phase 1</h1>
     </div>
     
     <div>
       <div>
         <h2>Invite Someone Inspiring</h2>
         <p>Know someone who could inspire others? Invite them to join!</p>
       </div>

       <div>
         <h3>Role Model's Information</h3>
       </div>

       <form onSubmit={handleSubmit}>
         <div>
           <label>
             Their Full Name <span>*</span>
           </label>
           <input
             type="text"
             name="fullName"
             value={formData.fullName}
             onChange={handleChange}
             required
           />
         </div>

         <div>
           <label>
             Their Email <span>*</span>
           </label>
           <input
             type="email"
             name="email"
             value={formData.email}
             onChange={handleChange}
             required
           />
         </div>

         <div>
           <label>
             Their Industry <span>*</span>
           </label>
           <select
             name="industry"
             value={formData.industry}
             onChange={handleChange}
             required
           >
             <option value="">Select an industry</option>
             <option value="technology">Technology</option>
             <option value="healthcare">Healthcare</option>
             <option value="finance">Finance</option>
             <option value="education">Education</option>
           </select>
         </div>

         <div>
           <label>Current Role</label>
           <input
             type="text"
             name="currentRole"
             value={formData.currentRole}
             onChange={handleChange}
           />
         </div>

         <div>
           <label>
             Why do they inspire you? <span>*</span>
           </label>
           <textarea
             name="whyInspiring"
             value={formData.whyInspiring}
             onChange={handleChange}
             required
             rows={4}
           />
         </div>

         <button type="submit">
           Send Invitation
         </button>
       </form>
     </div>
   </div>
 );
};

export default InvitePage;