import AsyncStorage from '@react-native-community/async-storage';

export const saveWorkouts = async (WorkoutList) => {
    console.log("Before saving")
    console.log(WorkoutList)
    console.log("Check retrieval")
    AsyncStorage.setItem("WorkoutList", JSON.stringify(WorkoutList))
    console.log(fetchWorkouts())
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