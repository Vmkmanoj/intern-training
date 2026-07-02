
import { useEffect, useState } from "react"
import { useUser } from "../context/userContext"
import Button from "../components/button"
import { Card } from "../components/card"

export const Home = ()=>{

    const {name,setName,city,setCity,counter,setCounter} = useUser()

    useEffect(()=>{
        setName("manojkumar")
        setCity("Tiruppur")
    },[])

    const increase = ()=>{
        setCounter(counter+1)
    }

    const decrease =()=>{
        setCounter(counter-1)

    }

        return(
            <>

                <Card title={name} details={`this guys from ${city}`} age={counter}/>
                <Card title={name} details={`this guys from ${city}`} age={counter}/>
                <Card title={name} details={`this guys from ${city}`} age={counter}/>

                <Button onClick={increase}>+</Button>
                {counter}
                <Button onClick={decrease}>-</Button>

            </>
        )
}

