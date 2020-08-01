import React from 'react';
import Workout from '../model/workout';
import Record from '../model/record';

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        const dummyWorkout = new Workout('StrongLifts', '0', [{name: 'Squat', sets: 5, reps: 5},
                        {name: 'Bench Press', sets: 5, reps: 5}, 
                        {name: 'Barbell Row', sets: 5, reps: 5}])
        this.state = ({selectedColor: colorSchemes.default, workouts: [dummyWorkout], records: []})
    }

    addWorkout = (woName, exercises) => {
        var wos = this.state.workouts;
        const wo = new Workout(woName, (wos.length).toString(), exercises)
        wos.push(wo);
        this.setState({workouts: wos})
    }

    editWorkout = (data, key) => {
        var wos = this.state.workouts
        var woAtIndex = wos[parseInt(key)]
        woAtIndex.name = data.name
        woAtIndex.exercises = data.exercises
        wos[woAtIndex.key] = woAtIndex
        this.setState({workouts: wos}) 
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
    }

    addRecord = (header, body) => {
        var records = this.state.records
        records.push(new Record(header, body, (records.length).toString()))
        this.setState({records: records})
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
    }

    render() {
        return(
            <AppContext.Provider value = {{colorSchemes: colorSchemes,
                                           selectedColor: this.state.selectedColor,
                                           workouts: this.state.workouts,
                                           records: this.state.records,
                                           addWorkout: this.addWorkout,
                                           editWorkout: this.editWorkout,
                                           deleteWorkout: this.deleteWorkout, 
                                           addRecord: this.addRecord,
                                           deleteRecord: this.deleteRecord}}>
              {this.props.children}
            </AppContext.Provider>
        )
    }
}

const colorSchemes = {default: {
                        bg: 'white',
                        atColor: 'tomato',
                        itColor: 'gray'},
                      red: {
                        bg: 'plum',
                        atColor: 'crimson',
                        itColor: 'gray'}
                    }