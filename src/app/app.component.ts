import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  stringToEvaluate: string = '';
  output: string | number = '0';
  operator: string = '';



  takeInput(num: number) {
    if (this.operator === '=') {
      this.stringToEvaluate = '';
      this.operator = '';
    }
    this.stringToEvaluate += num;
    this.output = this.stringToEvaluate;
    this.output = (parseFloat(this.output) * 10 + num).toString();
  }
  takeOp(operator: string) {
    if (this.operator === '=') {
      this.stringToEvaluate = this.output.toString();
    }
    this.operator = operator;
    this.stringToEvaluate += operator;
    console.log(this.stringToEvaluate)
  }
  takeSp(num: number | string) {
    if (this.operator === '=') {
      this.stringToEvaluate = '';
      this.operator = '';
    }
    if (typeof num === 'string' && num === '.') {
      if (this.stringToEvaluate.indexOf('.') === -1) {
        this.stringToEvaluate += '.';
      }
    } else {
      this.stringToEvaluate += num;
    }
    this.output = this.stringToEvaluate;
  }

  evaluateResult() {
    const parts = this.stringToEvaluate.split(this.operator);
    if (parts.length === 2) {
      const num1 = parseFloat(parts[0]);
      const num2 = parseFloat(parts[1]);
      switch (this.operator) {
        case '+':
          this.output = (num1 + num2);
          break;
        case '-':
          this.output = (num1 - num2);
          break;
        case '*':
          this.output = (num1 * num2);
          break;
        case '/':
          if (num2 === 0) {
            this.output = 'Error';
          } else {
            this.output = (num1 / num2);
          }
          break;
        default:
          break;
      }
      this.stringToEvaluate = this.output.toString();
      this.operator = '=';
    } else {
      this.output = 'Error';
    }
  }

  resetInput() {
    this.stringToEvaluate = '';
    this.output = '0';
    this.operator = '';
  }

  clear() {
    this.stringToEvaluate = this.stringToEvaluate.slice(0, -1);
    this.output = this.stringToEvaluate;
  }
}