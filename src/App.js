import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Card from './components/Card';
import Results from './components/Results';

export default function App() {
  const [cards, setCards] = useState([
    { balance: 0, limit: 0, utilization: 0 }, // Initial card 1
    { balance: 0, limit: 0, utilization: 0 }  // Initial card 2
  ]);
  const [totalCreditUtilization, setTotalCreditUtilization] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isMax, setIsMax] = useState(false);

  useEffect(() => {
    // Limit the number of inputs to 5 cards
    setIsMax( cards.length === 5 ? true : false); 
  }, [cards]);


  const addCardField = (e) => {
    e.preventDefault();
    // Create and add new card
    let newCard = {balance: 0, limit: 0, utilization: 0};
    setCards((oldCards) => [...oldCards, newCard]);
  };

  const rmCardField = (e) => {
    e.preventDefault();
    // Remove last card 
    setCards((oldCards) => {
      oldCards.pop();
      return [...oldCards];
    });
  };

  // Updates cards array without re-rendering
  const updateCard = (childCard, index) => { 
    // Original card values
    const oldBalance = cards[index].balance;
    const oldLimit = cards[index].limit;

    if (oldBalance !== childCard.balance || oldLimit !== childCard.limit) {
      // Update card balance/limit
      cards[index] = childCard;

      // Update card utilization ratio
      if (!childCard.limit || !childCard.balance) {
        cards[index].utilization = 0;
      } else {
        cards[index].utilization = ((childCard.balance * 100) / childCard.limit).toFixed(2)
      }
    }
    return;
  };

  // NOTE: Formula for percent utilization -- balance * 100 / limit
  useEffect(() => {
    // Update total utilization ratio when cards change
    let total;
    let subtotals = {balance: 0, limit: 0};
  
    // Aggregate values
    cards.forEach((card, i) => {
      if (!card.limit) {
        // If limit is zero, utilization is zero
        subtotals.limit += 0
        subtotals.balance += 0;
      } else {
        subtotals.balance += card.balance;
        subtotals.limit += card.limit;
      }
    })

    // Calculate total credit utilization
    if (!subtotals.limit || !subtotals.balance) {
      total = 0;
    } else {
      total = ((subtotals.balance * 100) / subtotals.limit).toFixed(2);
    }
    setTotalCreditUtilization(total);
  }, [cards])

  const handleCalculate = (e) => {
    e.preventDefault();
    // Force re-render to update utilizations
    setCards([...cards]);
    // Display results
    setShowResults(true);
  };

  const getBtnStyle = (type) => {
    // Hide '+' btn if reached max card#
    if ( type === 'add') {
      return isMax ? 'disabledBtn' : 'addBtn';
    }
    // Hide '-' btn if only one card
    return cards.length > 1 ? 'addBtn' : 'hide';
  }


  return (
    <div id='app'>
      <div class="container">
      <h1>Credit Utilization Ratio Calculator</h1>
      <p class="subheading">Use this calculator to evaluate your credit utilization ratio. This metric identifies the percentage of available credit limit across all revolving credit accounts, such as credit cards.</p>
      <div className='calculator-container'>
        <div className='calculator'>
        <form>
          {
            cards.map( (card, index) => {
              return (
                <Card 
                  card={card}
                  index={index}
                  import key={uniqid()}
                  update={updateCard}
                />
              )
            })
          }
        </form>
        <div className='btnFloatLeft'>
          <button onClick={addCardField} className={getBtnStyle('add')} disabled={isMax}>+ Add Another Card</button>
          <button onClick={rmCardField} className={getBtnStyle('remove')}>- Remove Card</button>
        </div>
        <div className='buttonRow'>
          <button className='submit' onClick={handleCalculate}>Calculate</button>
        </div>
        </div>
        
      </div>
      <aside>
      <div class="results-container">
        {
          showResults ? 
          <Results totalUtilization={totalCreditUtilization} cards={cards}/>
          :
          null
        }
        </div>
        </aside>
    </div>
    </div>
  );
}

