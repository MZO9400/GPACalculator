import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import Form from "react-bootstrap/Form";

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
  handleCHChange(event) {
    let index = parseInt(event.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let col = parseInt(event.target.getAttribute("col"));
    if (isNaN(col)) {
      col = 0;
    }
    let value = event.target.value;
    this.setState(state => (state.Semesters[col][index].CreditHours = value));
  }
  handleGradeChange(event) {
    let index = parseInt(event.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let col = parseInt(event.target.getAttribute("col"));
    if (isNaN(col)) {
      col = 0;
    }
    let value = event.target.value;
    this.setState(state => (state.Semesters[col][index].Grade = value));
  }
  handleNameChange(event) {
    let index = parseInt(event.target.id);
    if (isNaN(index)) {
      index = 0;
    }
    let col = parseInt(event.target.getAttribute("col"));
    if (isNaN(col)) {
      col = 0;
    }
    let value = event.target.value;
    this.setState(state => (state.Semesters[col][index].Name = value));
  }
  returnSubjectJSON(value, col) {
    return (
      <Form key={value} class="subject">
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
      let GPA = this.calculateGPA(i);
      let color = "";
      if (GPA > 3.1) {
        color = "btn btn-success";
      } else if (GPA > 2.1) {
        color = "btn btn-info";
      } else if (GPA > 1.1) {
        color = "btn btn-warning";
      } else {
        color = "btn btn-danger";
      }
      sems.push(
        <div className="innerdiv" key={i}>
          <button
            type="button"
            class="btn btn-success"
            onClick={this.insertNewSubject}
            id={i}
          >
            Add Subject
          </button>
          <br />
          {this.state.Semesters[i].map((val, index = 0) =>
            this.returnSubjectJSON(index, i)
          )}
          <button type="button" class={color} disabled>
            {GPA}
          </button>
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
      Sems[id][Sems[id].length - 1] &&
      (Sems[id][Sems[id].length - 1].Name.length === 0 ||
        Sems[id][Sems[id].length - 1].CreditHours <= 0 ||
        Sems[id][Sems[id].length - 1].CreditHours > 5)
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
    let CGPA = this.calculateCGPA();
    let color = "";
    if (CGPA > 3.1) {
      color = "btn btn-success";
    } else if (CGPA > 2.1) {
      color = "btn btn-info";
    } else if (CGPA > 1.1) {
      color = "btn btn-warning";
    } else {
      color = "btn btn-danger";
    }
    return (
      <div id="maindiv">
        <button
          type="button"
          class="btn btn-info"
          id="NewSemester"
          onClick={this.addSemester}
        >
          +
        </button>
        <div className="semesters">{this.getSems()}</div>
        <button type="button" class={color} id="GPA" disabled>
          {CGPA.toFixed(2)}
        </button>
      </div>
    );
  }
}
ReactDOM.render(<GPACalculator />, document.getElementById("root"));
