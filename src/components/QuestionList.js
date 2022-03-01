import React, { useEffect, useState }from "react";
import QuestionItem from "./QuestionItem";


function QuestionList() {
  const [questions, setQuestions] = useState([])
 
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(questions => setQuestions(questions)) 
}, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`,{
      method: "DELETE",
   })
    .then(resp => resp.json())
    .then(() => {
      const upDatedQuestions = questions.filter((question) => question.id !== id)
      setQuestions(upDatedQuestions)
    })
  }
  
   function handleAnswerChange(id, correctIndex){
     fetch(`http://localhost:4000/questions/${id}`, {
       method: "PATCH",
       headers: {
         "Content-Type" : "application/json"
       },
       body: JSON.stringify({correctIndex}),
      })
      .then(resp => resp.json())
      .then((upDatedQuestion) => {
        const upDatedQuestions = questions.map((question) => {
          if (question.id === upDatedQuestion.id)
          return upDatedQuestion
          return question
        })
        setQuestions(upDatedQuestions)
      })
   }

   const questionItems = questions.map((question) => (
      <QuestionItem
        key={question.id}
        question={question} 
        onDeleteClick={handleDeleteClick}
        onAnswerChange={handleAnswerChange}/>
  )) 
 
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
