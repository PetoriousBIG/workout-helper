import Record from '../../model/record'

//the business logic for the do-workout screen

//cleans the input suppled from the do-workout-modal
//converts the input to string literal of an integer greater than or equal to 1
export const cleanNum = (e) => {
    
    var inputAsNum = Math.floor(Number(e.nativeEvent.text))
    if (inputAsNum < 1){
      const one = 1
      return one.toString()
    }
    else if (isNaN(inputAsNum)){
      const one = 1
      return one.toString()
    }
    return inputAsNum.toString()
  }

//takes in the workout results as input and returns them represented as
//a string literal with format:
//'exerciseName: repsCompleted/goalReps @ weight'
export const createBody = (results) => {
    var body = ""
    results.forEach(element => {
      body += element.exercise + " " + element.completedReps + "/" + element.goalReps + " @ " + element.weight + "\n"
    })
    return body
  }

//takes in the string name of the exercise and returns that string concatinated with
//the string representation of today's date with format:
//'WorkoutName MM/dd/YYYY'
export const createHeader = (name) => {
    const now = new Date()
    const nowString = now.getUTCMonth() + "/" + now.getUTCDate() + "/" + now.getUTCFullYear()
    return name + " " + nowString
  }

//updates the reps and weight values of en exercise in exercises given by index
export const updateExerciseResult = (exercises, index, reps, weight) => {
    var set = exercises[index]
    set.completedReps = reps
    set.weight = weight
    exercises[index] = set
    return exercises
}

//returns a new record object
export const createRecord = (name, workoutResults) => {
    const header = createHeader(name)
    const body = createBody(workoutResults)
    return new Record(header, body)
  }