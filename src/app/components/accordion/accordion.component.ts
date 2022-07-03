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
  private code: string = '';
  public codeAlertVisible: boolean = false;
  private itemIdToDelete: number = 0;

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

    let accordionOpenTag: string;
    let accordionCloseTag: string;

    this.accordion.items.length === 0 ? accordionOpenTag = '' : accordionOpenTag = `<div class="accordion" id="${this.accordion.id}">`;
    this.accordion.items.length === 0 ? accordionCloseTag = '' : accordionCloseTag = '</div>';

    this.code =  
    `
    ${accordionOpenTag}
      ${itemsCode}
    ${accordionCloseTag}
    `;

    return this.code;
  }

  public openItem(id: number): void {
    this.newItem = false;
    this.item = this.accordion.items.find(item => item.id === id)!;
  }

  public editItem(): void {
    let newItems: any = [];

    newItems.push(this.item);
    
    this.accordion.items = this.accordion.items.map(item => newItems.find((newItem: any) => newItem.id === item.id) || item);
  }

  public setIdItemToDelete(id: number) {
    this.itemIdToDelete = id;
  }

  public deleteItem(): void {
    this.accordion.items = this.accordion.items.filter(item => item.id !== this.itemIdToDelete);
  }

  public copyCode(): void {
    navigator.clipboard.writeText(this.getCode());
    this.codeAlertVisible = true;
    setTimeout(() => {
      this.codeAlertVisible = false; 
    }, 2000);
  }

}


 


 