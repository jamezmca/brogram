import React, { useState, useEffect } from 'react'
import WorkoutCard from './WorkoutCard'
import { workoutProgram as training_plan } from '../utils/index_new.js'
import Modal from './Modal.jsx'


export default function Grid() {
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [savedWorkouts, setSavedWorkouts] = useState(null)
  const [showExerciseDescription, setShowExerciseDescription] = useState(null)

  const completedWorkouts = Object.keys(savedWorkouts || {}).filter(val => {
    const entry = savedWorkouts[val]
    return entry.isComplete
  })

  function handleSave(index, data) {
    // add in save behavior to local storage
    const newObj = {
      ...savedWorkouts,
      [index]: {
        ...data,
        isComplete: !!data?.isComplete || !!savedWorkouts?.[index]?.isComplete
      } // [index]: {isComplete: data.isComplete || false, weights: {bench: '14'}}
    }

    setSavedWorkouts(newObj)
    localStorage.setItem('brogram', JSON.stringify(newObj))

    setSelectedWorkout(null)
  }

  function handleComplete(index, data) {
    // check if complete
    const duplicatedData = { ...data }
    duplicatedData.isComplete = true
    handleSave(index, duplicatedData)

  }

  useEffect(() => {
    if (savedWorkouts || !localStorage) { return }
    let savedData = {}
    if (localStorage.getItem('brogram')) {
      savedData = JSON.parse(localStorage.getItem('brogram'))
    }
    setSavedWorkouts(savedData)
  }, [savedWorkouts])

  if (!savedWorkouts) { return null }

  return (
    <div className='training-plan-grid'>
      {showExerciseDescription && (
        <Modal showExerciseDescription={showExerciseDescription} handleCloseModal={() => setShowExerciseDescription(null)} />
      )}
      {Object.keys(training_plan).map((workout, workoutIndex) => {

        const isLocked = (workoutIndex === 0) ?
          false :
          !completedWorkouts.includes(`${workoutIndex - 1}`)

        const type = workoutIndex % 3 === 0 ? 'Push' : workoutIndex % 3 === 1 ? 'Pull' : 'Legs'


        const trainingPlan = training_plan[workoutIndex]


        if (workoutIndex === selectedWorkout) {
          return (
            <WorkoutCard setShowExerciseDescription={setShowExerciseDescription} savedWeights={savedWorkouts?.[workoutIndex]?.weights} trainingPlan={trainingPlan} handleComplete={handleComplete} handleSave={handleSave} key={workoutIndex} type={type} workoutIndex={workoutIndex} />
          )
        }

        return (
          <button onClick={() => {
            if (isLocked) { return }
            setSelectedWorkout(workoutIndex)
          }} className={'card plan-card ' + (isLocked ? ' inactive' : ' ')} key={workoutIndex}>
            {/* {isLocked && (
              <div className='locked-card'>
                <i className="fa-solid fa-lock"></i>
              </div>
            )} */}
            <div className='plan-card-header'>
              <p className=''>Day {((workoutIndex / 8) <= 1) ? '0' + (workoutIndex + 1) : workoutIndex + 1}</p>
              {isLocked ? <i className="fa-solid fa-lock"></i> : workoutIndex % 3 === 0 ? (
                <i className="fa-solid fa-dumbbell"></i>
              ) :
                workoutIndex % 3 === 1 ? (
                  <i className="fa-solid fa-weight-hanging"></i>
                ) : (
                  <i className="fa-solid fa-bolt"></i>
                )}
              {/* <p className=''>Day</p>
              <p><b>{workoutIndex + 1}</b></p> */}
            </div>
            <div className='plan-card-header'>

              <h4><b>{type}</b></h4>
            </div>
          </button>
        )
      })}
    </div>
  )
}
