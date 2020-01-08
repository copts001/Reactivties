import { IActivity } from "./../models/activity";
import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../API/agent";

configure({ enforceActions: "always" });
export class ActivityStore {
  @observable activityRegister = new Map();
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined = undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;
  @observable target = "";
  @computed get activitiesByDate() {
    return Array.from(this.activityRegister.values()).sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities',()=>{
        activities.forEach(activity => {
          activity.date = activity.date.split(".")[0];
          this.activityRegister.set(activity.id, activity);
        });
        this.loadingInitial = false;
      })
 
    } catch (error) {
      runInAction('loading activities',()=>{
        console.log(error);
        this.loadingInitial = false;
      })
   
    }
  };
  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      
      await agent.Activities.create(activity);
      runInAction('create activities',()=>{
        this.activityRegister.set(activity.id, activity);
        this.editMode = false;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('create activities error',()=>{
        console.log(error);
        this.submitting = false;
      })

    }
  };
  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('edit activities ',()=>{
        this.activityRegister.set(activity.id, activity);
        this.selectedActivity = activity;
        this.editMode = false;
        this.submitting = false;
      })

    } catch (error) {
      runInAction('edit activities error',()=>{
        this.submitting = false;
        console.log(error);
      })

    }
  };
  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('delete activities error',()=>{
        this.activityRegister.delete(id);
        this.submitting = false;
        this.target = "";
      })

    } catch (error) {
      runInAction('delete activities error',()=>{
        this.submitting = false;
      this.target = "";
      console.log(error);
      })

    }
  };
  @action openEditForm = (id: string) => {
    this.selectedActivity = this.activityRegister.get(id);
    this.editMode = true;
  };
  @action cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  };
  @action cancelFormOpen = () => {
    this.editMode = false;
  };
  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };
  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegister.get(id);
    this.editMode = false;
  };
}
export default createContext(new ActivityStore());
