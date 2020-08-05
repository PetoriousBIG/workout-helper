import React from 'react';
import Workout from '../model/workout';
import Record from '../model/record';
import {saveWorkouts, fetchWorkouts, 
        saveRecords, fetchRecords, 
        saveWorkoutInProgress, fetchWorkoutInProgress} from '../storage/DataPersistance'

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = ({ workouts: [], records: [], workoutInProgress: [], workoutIndex: -1})
    }

    async componentDidMount() {
        const wos = await fetchWorkouts()
        const recs = await fetchRecords()
        const woip = await fetchWorkoutInProgress()
        this.setState({workouts: wos, records: recs, workoutInProgress: woip[0], workoutIndex: woip[1]})
      }
    
    saveWorkoutInProgress = (resultsToSave, indexOfWorkout) => {
        this.setState({workoutInProgress: resultsToSave, workoutIndex: indexOfWorkout})
        saveWorkoutInProgress(resultsToSave, indexOfWorkout)

    }

    deleteWorkoutInProgress = () => {
        this.setState({workoutInProgress: [], workoutIndex: -1})
        saveWorkoutInProgress([], -1)
    }

    addWorkout = (woName, exercises) => {
        var wos = this.state.workouts;
        const wo = new Workout(woName, (wos.length).toString(), exercises)
        wos.push(wo);
        this.setState({workouts: wos})
        saveWorkouts(this.state.workouts)
    }

    editWorkout = (data, key) => {
        var wos = this.state.workouts
        var woAtIndex = wos[parseInt(key)]
        woAtIndex.name = data.name
        woAtIndex.exercises = data.exercises
        wos[woAtIndex.key] = woAtIndex
        this.setState({workouts: wos})
        saveWorkouts(this.state.workouts)
    }

    deleteWorkout = (key) => {
        const keyInt = parseInt(key)
        var wos = this.state.workouts
        wos.splice(keyInt, 1)
        var i
        for (i = keyInt; i < wos.length; i++){
            var wo = wos[i]
            wo.key = i.toString()
            wos[i] = wo 
        }
        this.setState({workouts: wos})
        saveWorkouts(this.state.workouts)
    }

    addRecord = (header, body) => {
        var records = this.state.records
        records.push(new Record(header, body, (records.length).toString()))
        this.setState({records: records})
        saveRecords(this.state.records)
    }

    deleteRecord = (key) => {
        const keyInt = parseInt(key)
        var records = this.state.records
        records.splice(keyInt, 1)
        var i
        for (i = keyInt; i < records.length; i++){
            var record = records[i]
            record.key = i.toString()
            records[i] = record
        }
        this.setState({records: records})
        saveRecords(this.state.records)
    }

    clearAllData = () => {
        this.setState({records: [], workouts: []})
        saveWorkouts([])
        saveRecords([])
    }

    render() {
        return(
            <AppContext.Provider value = {{workouts: this.state.workouts,
                                           records: this.state.records,
                                           workoutInProgress: this.state.workoutInProgress,
                                           workoutIndex: this.state.workoutIndex,
                                           addWorkout: this.addWorkout,
                                           editWorkout: this.editWorkout,
                                           deleteWorkout: this.deleteWorkout, 
                                           addRecord: this.addRecord,
                                           deleteRecord: this.deleteRecord,
                                           clearAllData: this.clearAllData,
                                           saveWorkoutInProgress: this.saveWorkoutInProgress,
                                           deleteWorkoutInProgress: this.deleteWorkoutInProgress}}>
              {this.props.children}
            </AppContext.Provider>
        )
    }
}