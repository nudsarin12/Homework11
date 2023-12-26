const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

function Counter(props) {
    console.log(props)
//   const [countNum, setCountNum] = React.useState(0)
 

//   const updateCounter = (n) => {
//     if(countNum+n < 0) {
//       return
//     }
    // setCountNum( (prv)=>{
    //   console.log(prv)
    //   return prv+n
    // })
    // setCountNum( prv => prv + n)
    // console.log(countNum)
//     setCountNum(countNum + n)
//   }
  return (
   <div className='counter'>
      <button onClick = {()=>props.hdlUpdate(props.item.id,-1)}> - </button>
      <h3>{props.item.Number}</h3>
      <button onClick = {()=>props.hdlUpdate(props.item.id,1)}> + </button>
      <button onClick = {()=>props.hdlUpdate(props.item.id,-props.item.Number)}> C </button>
      <button onClick={() => props.hdlDelete(props.item.id)}>X</button>
   </div>
  )
}

function SumInfo({ counters }) {
    const sum = counters.reduce((acc, counter) => acc + counter.Number, 0);
    return (
      <div className='suminfo'>
        <h1 style={{ fontSize: '50px', color: 'red' }}>Sum = {sum}</h1>
      </div>
    )
  }
  


function App() {


const [counters, setCounters] = React.useState([ {id:1, Number: 2} ])
// let allCounter = Array(counter).fill(<Counter />)

const hdlUpdate = (id, num) => {
    const cloneCounters = counters.map(counter => {
      if (counter.id === id) {
        const updatedNumber = counter.Number + num
        if (updatedNumber >= 0) {
          return { ...counter, Number: updatedNumber }
        }
      }
      return counter
    })
    setCounters(cloneCounters.filter(Boolean))
  }


  const hdlAddCounter = () => {
    const newId = counters.length === 0 ? 1 : counters.at(-1).id + 1
    setCounters([...counters, { id: newId, Number: 0 }])
  }

  const hdlDeleteCounter = (id) => {
    const filteredCounters = counters.filter(counter => counter.id !== id)
    setCounters(filteredCounters)
  }

  return (
    <>
      <h1 className='text-center'>Codecamp Academy 01</h1>
      <button className='text-center' onClick={hdlAddCounter}>Add Counter</button>
      <SumInfo counters={counters} />
      {counters.map(el => (
        <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlDelete={hdlDeleteCounter} />
      ))}
    </>
  )
}