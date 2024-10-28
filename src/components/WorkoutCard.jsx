import React, { useState } from 'react'
import { exerciseDescriptions } from '../utils/index_new'
// import { training_plan } from '../utils'

export default function WorkoutCard(props) {
  const { workoutIndex, type, handleComplete, handleSave, trainingPlan, savedWeights, setShowExerciseDescription } = props
  const [weights, setWeights] = useState(savedWeights || {})

  function handleAddWeight(title, weight) {
    const newObj = {
      ...weights,
      [title]: weight
    }
    setWeights(newObj)
  }


  const { workout, warmup } = trainingPlan

  return (
    <div className='workout-container'>
      <div className='workout-card card'>
        <div className='plan-card-header'>
          <p className=''>Day {((workoutIndex / 8) <= 1) ? '0' + (workoutIndex + 1) : workoutIndex + 1}</p>
          {workoutIndex % 3 === 0 ? (
            <i className="fa-solid fa-dumbbell"></i>
          ) :
            workoutIndex % 3 === 1 ? (
              <i className="fa-solid fa-weight-hanging"></i>
            ) : (
              <i className="fa-solid fa-bolt"></i>
            )}
        </div>
        <div className='plan-card-header'>
          <h2><b>{type} Workout</b></h2>
        </div>
      </div>

      <div className='workout-grid'>
        <div className='exercise-name'> <h4>Warmup</h4></div>
        <h6>Sets</h6>
        <h6>Reps</h6>
        <h6 className='weight-input'>Max Weight</h6>
        {warmup.map((warmupExercise, warmupIndex) => {
          return (
            <React.Fragment key={warmupIndex}>
              <div className='exercise-name'>
                <p>{warmupIndex + 1}. {warmupExercise.name}</p>
                <button onClick={() => {
                  setShowExerciseDescription({ name: warmupExercise.name, description: exerciseDescriptions[warmupExercise.name] })
                }} className='help-icon '>
                  <i className="fa-regular fa-circle-question"></i>
                </button>
              </div>
              <p className='exercise-info'>{warmupExercise.sets}</p>
              <p className='exercise-info'>{warmupExercise.reps}</p>
              <input value={weights[warmupExercise.name] || ''} onChange={(e) => {
                handleAddWeight(warmupExercise.name, e.target.value)
              }} disabled className='weight-input' placeholder='N/A' />
            </React.Fragment>
          )
        })}
      </div>
      <div className='workout-grid'>
        <div className='exercise-name'> <h4>Workout</h4></div>
        <h6>Sets</h6>
        <h6>Reps</h6>
        <h6 className='weight-input'>Max Weight</h6>
        {workout.map((warmupExercise, warmupIndex) => {
          return (
            <React.Fragment key={warmupIndex}>
              <div className='exercise-name'>
                <p>{warmupIndex + 1}. {warmupExercise.name}</p>
                <button onClick={() => {
                  setShowExerciseDescription({ name: warmupExercise.name, description: exerciseDescriptions[warmupExercise.name] })
                }} className='help-icon '>
                  <i className="fa-regular fa-circle-question"></i>
                </button>
              </div>
              <p className='exercise-info'>{warmupExercise.sets}</p>
              <p className='exercise-info'>{warmupExercise.reps}</p>
              <input value={weights[warmupExercise.name] || ''} onChange={(e) => {
                handleAddWeight(warmupExercise.name, e.target.value)
              }} className='weight-input' />
            </React.Fragment>
          )
        })}
      </div>
      <div className='workout-buttons'>
        <button onClick={() => handleSave(workoutIndex, {
          //ADD DATA IN HERE + EXITS THE WORKOUT
          weights
        })}>Save & Exit</button>
        <button onClick={() => handleComplete(workoutIndex, {

          weights
        })} disabled={Object.keys(weights).length !== workout.length}>Complete</button>
      </div>
    </div>

  )
}
