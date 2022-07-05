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

  constructor() { }

  ngOnInit(): void {
    this.tabList.tabs = [];
  }

  public initTab(): void {
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
    this.tab = this.tabList.tabs.find(tab => tab.id === id)!;
  }

  public setIdTabToDelete(id: number) {

  }

  public setOtherTabsState(): void {
    if(this.tab.active) {
      this.tabList.tabs.forEach((tab) => {
        tab.active = false;
      });
    }
  }

}
