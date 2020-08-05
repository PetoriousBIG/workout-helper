import AsyncStorage from '@react-native-community/async-storage';

export const saveWorkouts = async (WorkoutList) => {
    AsyncStorage.setItem("WorkoutList", JSON.stringify(WorkoutList))
}

export const fetchWorkouts = async () => {
    try{
        let wos = await AsyncStorage.getItem("WorkoutList")
        if (wos === null) { return []; }
        return JSON.parse(wos)
    } catch (error) {
        console.log('Error fetching Workout List', error);
    }
}

export const saveRecords = async (RecordList) => {
    AsyncStorage.setItem("RecordList", JSON.stringify(RecordList))
}

export const fetchRecords = async () => {
    try{
        let recs = await AsyncStorage.getItem("RecordList")
        if (recs === null) { return []; }
        return JSON.parse(recs)
    } catch (error) {
        console.log('Error fetching Workout List', error);
    }
}

export const saveWorkoutInProgress = (results, index) => {
    const obj = {results: results, index: index}
    console.log(obj)
    AsyncStorage.setItem("InProgress", JSON.stringify(obj))
}

export const fetchWorkoutInProgress = async () => {
    try {
        let obj = JSON.parse(await AsyncStorage.getItem("InProgress"))
        if (obj === null) {return []; }
        return [obj.results, obj.index]
    } catch (error) {
        console.log('Error fetching Workout In Progress', error)
    }
}