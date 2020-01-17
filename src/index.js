import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class GPACalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Semesters: [[{ Name: "", Grade: 0, CreditHours: 0 }]] };
    this.insertNewSubject = this.insertNewSubject.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCHChange = this.handleCHChange.bind(this);
    this.addSemester = this.addSemester.bind(this);
  }
  count = 0;
  handleCHChange(e) {
    let index = parseInt(e.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let col = parseInt(e.target.getAttribute("col"));
    if (isNaN(col)) {
      col = 0;
    }
    let value = e.target.value;
    this.setState(state => (state.Semesters[col][index].CreditHours = value));
  }
  handleGradeChange(e) {
    let index = parseInt(e.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let col = parseInt(e.target.getAttribute("col"));
    if (isNaN(col)) {
      col = 0;
    }
    let value = e.target.value;
    this.setState(state => (state.Semesters[col][index].Grade = value));
  }
  handleNameChange(e) {
    let index = parseInt(e.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let col = parseInt(e.target.getAttribute("col"));
    if (isNaN(col)) {
      col = 0;
    }
    let value = e.target.value;
    this.setState(state => (state.Semesters[col][index].Name = value));
  }
  returnSubjectJSON(value, col) {
    return (
      <Form key={value}>
        <Form.Control
          onChange={this.handleNameChange}
          placeholder="Enter Subject Name"
          id={value}
          col={col}
          value={this.state.value}
        ></Form.Control>
        <Form.Control
          as="select"
          onChange={this.handleGradeChange}
          id={value}
          col={col}
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
          col={col}
        ></Form.Control>
      </Form>
    );
  }
  getSems() {
    let sems = [];
    for (let i = 0; i <= this.count; i++) {
      sems.push(
        <div className="innerdiv" key={i}>
          <Button onClick={this.insertNewSubject} id={i}>
            Add Subject
          </Button>
          <br />
          {this.state.Semesters[i].map((val, index = 0) =>
            this.returnSubjectJSON(index, i)
          )}
          <Button disabled>{this.calculateGPA(i)}</Button>
        </div>
      );
    }
    return sems;
  }
  addSemester(event) {
    let Sems = this.state.Semesters;
    Sems.push([]);
    this.count++;
    this.forceUpdate();
    return this.getSems();
  }
  calculateCGPA() {
    let CGPA = 0;
    for (let i = 0; i < this.state.Semesters.length; i++) {
      CGPA += parseFloat(this.calculateGPA(i));
    }
    return CGPA / this.state.Semesters.length;
  }
  calculateGPA(col) {
    let gradePoint = 0;
    let creditHourCount = 0;
    for (let i = 0; i < this.state.Semesters[col].length; i++) {
      gradePoint +=
        parseInt(this.state.Semesters[col][i].CreditHours) *
        parseFloat(this.state.Semesters[col][i].Grade);
      creditHourCount += parseInt(this.state.Semesters[col][i].CreditHours);
    }
    return isNaN(gradePoint / creditHourCount)
      ? 0
      : (gradePoint / creditHourCount).toFixed(2);
  }
  insertNewSubject(event) {
    let id = parseInt(event.target.id);
    let Sems = this.state.Semesters;
    if (
      Sems[id][Sems[id].length - 1].Name.length === 0 ||
      Sems[id][Sems[id].length - 1].CreditHours <= 0 ||
      Sems[id][Sems[id].length - 1].CreditHours > 5
    ) {
      alert("Please fill the previous data before proceeding");
      return;
    }
    Sems[id].push({ Name: "", Grade: 0, CreditHours: 0 });
    this.setState({
      Semesters: Sems
    });
  }
  render() {
    return (
      <div id="maindiv">
        <Button id="NewSemester" onClick={this.addSemester}>
          +
        </Button>
        <div className="semesters">{this.getSems()}</div>
        <Button id="GPA" disabled>
          {this.calculateCGPA()}
        </Button>
      </div>
    );
  }
}
ReactDOM.render(<GPACalculator />, document.getElementById("root"));
