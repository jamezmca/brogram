import Grid from "./components/Grid"
import Layout from "./components/Layout"


function App() {

  return (
    <Layout>
      <main>
        <h5> Complete this training program if you want to ...  </h5>
        <ol className="benefits-list">
          <li>Follow a simple program with guaranteed results</li>
          <li className="">Get fit, healthy, strong and shredded</li>
          <li>Learn more about gym, training and technique</li>
          <li>Become a lifetime gym bro 💛</li>
        </ol>
        <h3>The Rules</h3>
        <p>To complete this program, you <b>MUST</b> follow these 3 simple rules:</p>
        <ul className="rules-list">
          <div className="rule-item">
            <p ><b>Rest</b> </p>
            <p>Ensure that you are taking rest days where necessary</p>
          </div>
          <div className="rule-item">
            <p ><b>Reps</b> </p>
            <p>Every rep is a pause rep following a <abbr title="2 Seconds down -> 2 Seconds pause -> 2 Seconds up">2 - 2 - 2 tempo</abbr> </p>
          </div>
          <div className="rule-item">
            <p ><b>Weight*</b> </p>
            <p>Select the maximum weight that allows complete the set with good form</p>
          </div>
        </ul>
        <small>* The first and second set should be at 75% and then 85% of your working weight used for the last two sets.</small>
        <h3>The Training Plan</h3>
        <p>This training plan uses a structure known as the <b>Bro Split</b>, and follows this rotation ⬇️</p>
        <p><b><i>Push &rarr; Pull &rarr; Legs &rarr; Repeat</i></b></p>
        <p>Complete all of the below workouts and track your progress along the way ✅</p>
        <Grid />
      </main>
    </Layout>
  )
}

export default App
