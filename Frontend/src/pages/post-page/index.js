import React from 'react';
import CommentSection from '../../components/Post'; 
import Garbage from '../../../public/images/rimjhim/garbage.png';
import { useState } from 'react';
const serverUrl=process.env.NEXT_PUBLIC_SERVER_URL

const dummyData = [
    {
      username: 'John Doe',
      status: 'In Process',
      issueName: 'Lorem Ipsum Issue',
      issueDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'City A',
      date: '2024-02-10',
      upvoteCount: 10,
      category: 'Technology',
      image: Garbage,
      comments: [
        { username: 'Alice', text: 'Great issue!' },
        { username: 'Bob', text: 'I agree, this needs attention.' },
      ],
    },
  ];
  
  
const IssuesPage = () => {
  // You should replace dummyData with your actual data
  const issuesData = dummyData;

  const handleUpvote = (issueId) => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${serverUrl}/api/issues/like/`+issueId, {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setIssueDetails(jsonData);
      } catch (error) {

        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    console.log(`Upvoted issue ${issueId}`);
  };

  const handleSubmitComment = (comment, issueId) => {
    // Logic to handle submitting comments
    console.log(`Comment submitted for issue ${issueId}: ${comment}`);
  };


  
  return (
    <div>
      <h1>Issues Page</h1>
      {issuesData.map((issue, index) => (
        <CommentSection
          key={index}
          issue={issue}
          onUpvote={() => handleUpvote(issue.id)}
          onCommentSubmit={(comment) => handleSubmitComment(comment, index)}
        />
      ))}
    </div>
  );
};

export default IssuesPage;
