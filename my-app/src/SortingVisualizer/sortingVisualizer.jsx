import React from 'react';
import { getMergeSortAnimation, getSelectionSort } from '../SortingAlgorithms/sortingAlgorithms.js';
import './sortingVisualizer.css';

const ANIMATION_SPEED = 5;
const NUMBER_OF_ARRAY = window.innerWidth / 16;
const PRIMARY_COLOR = 'black';
const SECONDARY_COLOR = 'red';



export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({array});
  }

  mergeSort() {
      const animations = getMergeSortAnimation(this.state.array);
      for (let i=0; i<animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 != 2;
          if  (isColorChange) {
              const [barOneIdx, barTwoIdx] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
              setTimeout(() => {
                  barOneStyle.backgroundColor = color;
                  barTwoStyle.backgroundColor = color;
              }, i * ANIMATION_SPEED);
          } else {
              setTimeout (() => {
                  const [barOneIdx, newHeight] = animations[i];
                  const barOneStyle = arrayBars[barOneIdx].style;
                  barOneStyle.height = `${newHeight}px`;
              }, i * ANIMATION_SPEED);
          }

      }

  }

  selectionSort() {
      const animations = getSelectionSort(this.state.array);

  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>

      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
