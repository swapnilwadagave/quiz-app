import React, { Component } from "react";
import "./assets/style.css";
import ReactDOM from "react-dom";
import QuizService from "./quizservice/index";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class MainQuiz extends Component {
  state = {
    questionBank: [],
    score: 0,
    totalAnswered: 0,
  };

  getQuestions = () => {
    QuizService().then((response) => {
      console.log(response);
      this.setState({
        questionBank: response,
      });
    });
  };
  computeAnswer = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
      this.setState({
        score: this.state.score + 1,
      });
    }
    this.setState({
      totalAnswered:
        this.state.totalAnswered < 5 ? this.state.totalAnswered + 1 : 5,
    });
  };
  resetGame = () => {
    this.getQuestions();
    this.setState({
      score: 0,
      totalAnswered: 0,
    });
  };
  componentDidMount() {
    this.getQuestions();
  }
  render() {
    return (
      <div className="container">
        <div className="title">Quiz</div>
        {this.state.questionBank.length > 0 &&
          this.state.totalAnswered < 5 &&
          this.state.questionBank.map(
            ({ question, answers, correct, questionId }) => {
              return (
                <QuestionBox
                  question={question}
                  options={answers}
                  key={questionId}
                  selectedAnswer={(answer) =>
                    this.computeAnswer(answer, correct)
                  }
                />
              );
            }
          )}
        {this.state.totalAnswered === 5 ? (
          <Result score={this.state.score} playAgain={this.resetGame} />
        ) : null}
      </div>
    );
  }
}
ReactDOM.render(<MainQuiz />, document.getElementById("root"));
