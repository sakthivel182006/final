import React, { useState } from 'react';
import './Contact.css'; // You can style this page in this CSS file
import { useFeedbackStore } from '../store/feedback'; // Adjust the path accordingly

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const { createFeedback } = useFeedbackStore(); // Access the store function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call createFeedback from Zustand store
    const response = await createFeedback(formData);

    if (response.success) {
      alert('Feedback submitted successfully!');
    } else {
      alert(response.message);
    }

    // Clear the form
    setFormData({ name: '', email: '', comment: '' });
  };

  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <p>If you'd like to get in touch, feel free to reach out to me through the following channels:</p>
      <div className="contact-info">
        <p><strong>Phone:</strong> 9361586944</p>
        <p><strong>Email:</strong> <a href="mailto:sakthivelv202222@gmail.com">sakthivelv202222@gmail.com</a></p>
      </div>
      <p>I'm always open to new opportunities, collaborations, or simply a friendly chat. Looking forward to connecting!</p>

      <h2>Feedback Form</h2>
      <p>Please feel free to leave your feedback, suggestions, or comments below. I value your input and strive to improve based on your thoughts and experiences.</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>

      <h3>Other Ways to Connect</h3>
      <p>If you'd like to keep up with my work, feel free to follow me on my social media platforms:</p>
      <ul>
        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sakthivel2006" target="_blank" rel="noopener noreferrer">Your LinkedIn</a></li>
      </ul>
      <p>Whether you're a fellow developer, a business owner, or just someone interested in the work I do, I'm always happy to connect and discuss new ideas!</p>
      <p>Thank you for reaching out!</p>
    </div>
  );
}

export default Contact;
