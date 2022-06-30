import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit {

  public accordion = {
    id: 'test-accordion',
    items: [
      {
        id: 0,
        headerId: 'home-header',
        headerText: 'home',
        bodyId: 'home-body',
        bodyText: 'This is the home item.',
        show: false
      },
      {
        id: 0,
        headerId: 'contact-header',
        headerText: 'contact',
        bodyId: 'contact-body',
        bodyText: 'This is the contact item.',
        show: false
      }
    ]
  }

  public item = {
    id: 0,
    headerId: '',
    headerText: '',
    bodyId: '',
    bodyText: '',
    show: false
  }

  public newItem: boolean = false;

  constructor() { 
    this.accordion.items = [];
  }

  ngOnInit(): void {
  }

  public addElement(): void {
    this.item.id = Date.now();
    this.accordion.items.push(this.item);
  }

  public initItem(): void {
    this.newItem = true;
    this.item = {
      id: 0,
      headerId: '',
      headerText: '',
      bodyId: '',
      bodyText: '',
      show: false
    }
  }

  public getCode(): string {
    let itemsCode: string = '';

    this.accordion.items.forEach((item) => {
      itemsCode += 
      `
        <div class="accordion-item">
          <h2 class="accordion-header" id="${item.headerId}">
            <button class="accordion-button${item.show ? '' : ' collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${item.bodyId}" aria-expanded="true" aria-controls="${item.bodyId}">
              ${item.headerText}
            </button>
          </h2>
          <div id="${item.bodyId}" class="accordion-collapse collapse ${item.show ? 'show' : ''}" attr.aria-labelledby="${item.headerId}" data-bs-parent="#${this.accordion.id}">
            <div class="accordion-body">
              ${item.bodyText}   
            </div>
          </div>
        </div>
      `;
    });

    return(
      `
      <div class="accordion" id="${this.accordion.id}">
        ${itemsCode}
      </div>
      `
    );
  }

  public editItem(id: number): void {
    this.newItem = false;
    this.item = this.accordion.items.find(item => item.id === id)!;
  }

}
