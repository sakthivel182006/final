import React from 'react';
import './About.css'; // Add any styles for the About page here

const About = () => {
  return (
    <div className="about-container">
      <h1>About Me</h1>
      <p>
        Hello! I'm [Your Name], a passionate developer with a strong interest in creating
        innovative and efficient solutions. With a background in [Your field of study/experience],
        I specialize in building user-friendly web applications and delivering high-quality software
        solutions. I thrive in collaborative environments and always aim to contribute to impactful projects.
      </p>
      <p>
        My journey began in [mention when you started coding or working in the tech field], and over
        the years, I've developed skills in [list relevant technologies, e.g., React, Node.js, JavaScript, etc.].
        I love staying updated with the latest trends in technology and continuously improving my skill set.
      </p>
      <p>
        When I'm not coding, you can find me [mention any hobbies or personal interests, e.g., reading books,
        traveling, gaming, etc.]. I'm always open to new ideas and challenges, so feel free to reach out if you
        want to connect or collaborate!
      </p>
    </div>
  );
}

export default About;
