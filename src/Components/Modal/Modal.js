import React, { Component } from "react";
import Row from "./Row";
import persons from "../data/data.json";
import "./Modal.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: persons,
      direction: {
        id: "asc",
        name: "asc",
        date: "asc",
        count: "asc"
      }
    };
    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.filterArray = this.filterArray.bind(this);
  }
  compareBy(key) {
    const strToDate = str => {
      const arr = str.split(".");
      const year = +arr[2];
      const month = +arr[1] - 1;
      const day = +arr[0];
      return new Date(year, month, day);
    };
    return (a, b) => {
      if (key === "date") {
        if (this.state.direction[key] === "asc") {
          if (strToDate(a[key]) < strToDate(b[key])) return -1;
          if (strToDate(a[key]) > strToDate(b[key])) return 1;
          return 0;
        } else {
          if (strToDate(a[key]) < strToDate(b[key])) return 1;
          if (strToDate(a[key]) > strToDate(b[key])) return -1;
          return 0;
        }
      } else {
        if (this.state.direction[key] === "asc") {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        } else {
          if (a[key] < b[key]) return 1;
          if (a[key] > b[key]) return -1;
          return 0;
        }
      }
    };
  }

  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    console.log(this.state.direction[key]);
    this.setState({
      data: arrayCopy,
      direction: {
        ...this.state.direction,
        [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
      }
    });
  }

  filterArray(event) {
    const name = event.target.name;
    const val = event.target.value + "";

    const newArray = persons.filter(item => {
      const str = item[name] + "";
      return str.toLowerCase().indexOf(val.toLowerCase()) !== -1;
    });

    this.setState({ data: newArray });
  }

  render() {
    const rows = this.state.data.map(rowData => <Row {...rowData} />);
    const column = ["id", "name", "date", "count"];
    const sortRow = column.map(val => (
      <th key={val} onClick={() => this.sortBy(val)}>
        {val}
      </th>
    ));

    const searchRow = column.map(val => (
      <th>
        <input size="1" onChange={this.filterArray} type="text" name={val} />
      </th>
    ));

    return (
      <div id="openModal" className="modalDialog">
        <div>
          <a href="#close" title="Закрыть" className="close">
            X
          </a>

          <table className="table">
            <thead key="thead">
              <tr key="sort">{sortRow}</tr>
              <tr key="search">{searchRow}</tr>
            </thead>
            <tbody key="tbody">{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
