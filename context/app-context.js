import React from 'react';
import Workout from '../model/workout';

export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
    constructor(props){
        super(props);
        this.state = ({selectedColor: colorSchemes.default, workouts: []})
    }

    addWorkout = (woName) => {
        var wos = this.state.workouts;
        const wo = new Workout(woName, (wos.length).toString())
        wos.push(wo);
        this.setState({workouts: wos})
    }

    editWorkout = (data, key) => {
        var wos = this.state.workouts
        var woAtIndex = wos[parseInt(key)]
        woAtIndex.name = data.name
        wos[woAtIndex.key] = woAtIndex
        this.setState({workouts: wos}) 
    }

    deleteWorkout = (key) => {
        const keyInt = parseInt(key)
        var wos = this.state.workouts
        wos.splice(keyInt, 1)
        for (i = keyInt; i < wos.length; i++){
            var wo = wos[i]
            console.log(wo)
            wo.key = i.toString()
            wos[i] = wo 
        }
        this.setState({workouts: wos})
        console.log(this.state.workouts)
    }

    render() {
        return(
            <AppContext.Provider value = {{colorSchemes: colorSchemes,
                                           selectedColor: this.state.selectedColor,
                                           workouts: this.state.workouts,
                                           addWorkout: this.addWorkout,
                                           editWorkout: this.editWorkout,
                                           deleteWorkout: this.deleteWorkout}}>
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