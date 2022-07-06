import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  public tabs: any[] = [];

  public tabList = {
    listId: 'example-tablist',
    tabs: [
      {
        id: 0,
        tabId: '',
        divId: '',
        tabText: '',
        divText: '',
        active: false
      }
    ]
  };

  public tab = {
    id: 0,
    tabId: '',
    divId: '',
    tabText: '',
    divText: '',
    active: false
       
  };

  public isNewTab: boolean = false;
  public idTabToDelete: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.tabList.tabs = [];
  }

  public initTab(): void {
    this.isNewTab = true;
    this.tab = {
      id: 0,
      tabId: '',
      divId: '',
      tabText: '',
      divText: '',
      active: false
    };
  }

  public addTab(): void {
    this.tab.id = Date.now();
    this.tabList.tabs.push(this.tab);
  }

  public activeTabExists(): boolean {
    let activeTabExists: boolean = false;

    for(let i=0; i<this.tabList.tabs.length; i++) {
      if(this.tabList.tabs[i].active) {
        activeTabExists = true;
        break;
      }
    }  

    return activeTabExists;
  }

  public openTab(id: number) {
    this.isNewTab = false;
    this.tab = this.tabList.tabs.find(tab => tab.id === id)!;
  }

  public editTab(): void {
    let newTabs: any[] = [];
    newTabs.push(this.tab);

    this.tabList.tabs = this.tabList.tabs.map(tab => newTabs.find((newTab: any) => newTab.id === tab.id) || tab);
  }

  public setIdTabToDelete(id: number): void {
    this.idTabToDelete = id;
  }

  public deleteTab(): void {
    this.tabList.tabs = this.tabList.tabs.filter(tab => tab.id !== this.idTabToDelete);
  }

  public setOtherTabsState(): void {
    if(this.tab.active) {
      this.tabList.tabs.forEach((tab) => {
        if(tab.id !== this.tab.id) {
          tab.active = false;
        }
      });
    }
  }

  public getCode(): string {
    let code: string = '';

    code += 
    `
    <ul class="nav nav-tabs" id=${this.tab.tabId} role="tablist">
    `;
    this.tabList.tabs.forEach((tab) => {
      code +=
      `
        <li class="nav-item" role="presentation">
          <button class="nav-link ${tab.active ? 'active' : ''}" id="${this.tab.tabId}" data-bs-toggle="tab" data-bs-target="#${this.tab.divId}" type="button" role="tab" aria-controls="${this.tab.divId}" aria-selected="${this.tab.active}">
            ${tab.tabText}
          </button>
        </li>
      `;
    });
    code +=
    `
    </ul>
    <div class="tab-content">
    `;
    this.tabList.tabs.forEach((tab) => {
      code +=
      `
      <div class="tab-pane${tab.active ? ' active show' : ''}" id="${this.tab.divId}" role="tabpanel" aria-labelledby="${this.tab.tabId}">
        ${tab.divText}
      </div>
      `;
    });
    code +=
    `
    </div>
    `;

    return this.tabList.tabs.length === 0 ? '' : code;
  }

}
