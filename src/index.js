import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class GPACalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Subjects: [] };
    this.insertNewSubject = this.insertNewSubject.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCHChange = this.handleCHChange.bind(this);
  }
  handleCHChange(e) {
    let index = parseInt(e.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let value = e.target.value;
    this.setState(state => (state.Subjects[index].CreditHours = value));
  }
  handleGradeChange(e) {
    let index = parseInt(e.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let value = e.target.value;
    this.setState(state => (state.Subjects[index].Grade = value));
  }
  handleNameChange(e) {
    let index = parseInt(e.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let value = e.target.value;
    this.setState(state => (state.Subjects[index].Name = value));
  }
  returnSubjectJSON(value) {
    return (
      <Form key={value}>
        <Form.Control
          onChange={this.handleNameChange}
          placeholder="Enter Subject Name"
          id={value}
          value={this.state.value}
        ></Form.Control>
        <Form.Control
          as="select"
          onChange={this.handleGradeChange}
          id={value}
          defaultValue="0"
        >
          <option value="4">A</option>
          <option value="3.67">A-</option>
          <option value="3.33">B+</option>
          <option value="3">B</option>
          <option value="2.67">B-</option>
          <option value="2.33">C+</option>
          <option value="2">C</option>
          <option value="1.67">C-</option>
          <option value="1.33">D+</option>
          <option value="1">D</option>
          <option value="0">F</option>
        </Form.Control>
        <Form.Control
          onChange={this.handleCHChange}
          placeholder="Enter Credit Hours"
          type="number"
          min="0"
          max="5"
          id={value}
        ></Form.Control>
      </Form>
    );
  }
  calculateGPA() {
    let gradePoint = 0;
    let creditHourCount = 0;
    for (var i = 0; i < this.state.Subjects.length; i++) {
      gradePoint +=
        parseInt(this.state.Subjects[i].CreditHours) *
        parseFloat(this.state.Subjects[i].Grade);
      creditHourCount += parseInt(this.state.Subjects[i].CreditHours);
    }
    return isNaN(gradePoint / creditHourCount)
      ? 0
      : (gradePoint / creditHourCount).toFixed(2);
  }
  insertNewSubject(prop) {
    this.setState({
      Subjects: [...this.state.Subjects, { Name: "", Grade: 0, CreditHours: 0 }]
    });
  }
  render() {
    return (
      <div>
        <Button onClick={this.insertNewSubject}>+</Button>
        <br />
        {this.state.Subjects.map((val, index = 0) =>
          this.returnSubjectJSON(index)
        )}
        <Button id="GPA" disabled>
          {this.calculateGPA()}
        </Button>
      </div>
    );
  }
}
ReactDOM.render(<GPACalculator />, document.getElementById("root"));
