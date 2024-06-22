import { useState, useEffect } from 'react'

export const Home = () => {
  const API_KEY = 'd2f83a6f66-110d3d2ca0-sfggjw'
  const [exchangeRate, setExchangeRate] = useState(null)
  const [mxnAmount, setMxnAmount] = useState('')
  const [solAmount, setSolAmount] = useState(1)
  const [solToMxn, setSolToMxn] = useState(null)
  const [isSolToMxn, setIsSolToMxn] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://api.fastforex.io/fetch-one?from=mxn&to=sol&api_key=${API_KEY}`
        )
        if (!response.ok) {
          throw new Error('No se pudo obtener la tasa de cambio')
        }
        const data = await response.json()
        const mxnToSol = data.result.SOL
        const solToMxnValue = 1 / mxnToSol
        console.log(`1 Peso Mexicano equivale a ${mxnToSol.toFixed(6)} Solana`)
        console.log(
          `1 Solana equivale a ${solToMxnValue.toFixed(2)} Pesos Mexicanos`
        )
        setExchangeRate(mxnToSol)
        setSolToMxn(solToMxnValue.toFixed(2))
        setMxnAmount((1 / mxnToSol).toFixed(2))
      } catch (error) {
        setError(error)
        console.error('Error en la data:', error)
      }
    }
    fetchExchangeRate()
  }, [])

  const handleMxnChange = (e) => {
    const mxn = e.target.value
    setMxnAmount(mxn)
    if (exchangeRate) {
      const sol = mxn * exchangeRate
      setSolAmount(sol.toFixed(6))
    }
  }

  const handleSolChange = (e) => {
    const sol = e.target.value
    setSolAmount(sol)
    if (exchangeRate) {
      const mxn = sol / exchangeRate
      setMxnAmount(mxn.toFixed(6))
    }
  }

  const handleSwap = () => {
    setIsSolToMxn(!isSolToMxn)
    if (isSolToMxn) {
      setMxnAmount(1)
      const newAmountMxn = exchangeRate
      setSolAmount(newAmountMxn.toFixed(6))
    } else {
      setSolAmount(1)
      const newMxnAmount = 1 / exchangeRate
      setMxnAmount( newMxnAmount.toFixed(2))
    }
  }

  return (
    <div className="h-screen w-full">
      <span className="block w-full h-[60px]"></span>

      <div className="w-3/4 h-screen m-auto">
        <div className="flex mb-10">
          <img
            className="h-[120px]"
            src="https://upload.wikimedia.org/wikipedia/commons/3/34/Solana_cryptocurrency_two.jpg"
            alt="solana-logo"
          />
          <div>
            <p className="text-5xl mb-2">
              SOL/MXN:Intercambiar Solana (SOL) a Peso Mexicano (MXN)
            </p>
            <p className="mb-2">
              {isSolToMxn
                ? `1 Solana equivale a ${solToMxn} MXN Pesos mexicanos`
                : `1 Peso Mexicano equivale a ${exchangeRate} Solana`}
            </p>
            <button className="bg-green-700 p-4 font-bold text-white rounded-full">
              Comprar solana
            </button>
          </div>
        </div>

        <div className="flex gap-10 justify-center items-center">
          <div className="flex flex-col">
            <input
              className=" border-2 border-gray-300 p-5 w-[350px] rounded-full mb-5 focus:outline-green-700"
              type="number"
              value={isSolToMxn ? solAmount : mxnAmount}
              onChange={isSolToMxn ? handleSolChange : handleMxnChange}
            />
            <span className="p-5 rounded-full w-100 bg-gray-200 read-only:">
              {isSolToMxn ? 'SOL' : 'MXN'}
            </span>
          </div>
          <div>
            <button
              className="w-[40px] h-[40px] rounded-full bg-gray-200 flex items-center justify-center"
              onClick={handleSwap}
            >
              <img
                width="24"
                height="24"
                src="https://img.icons8.com/forma-bold/48/data-in-both-directions.png"
                alt="data-in-both-directions"
              />
            </button>
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              value={isSolToMxn ? mxnAmount : solAmount}
              onChange={isSolToMxn ? handleMxnChange : handleSolChange}
              className="border-gray-300 border-2 mb-5 p-5 rounded-full w-[350px] focus:outline-green-700"
            />
            <span className="p-5 rounded-full w-100 bg-gray-200 read-only:">
              {isSolToMxn ? 'MXN' : 'SOL'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
