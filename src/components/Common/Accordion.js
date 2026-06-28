import { useState } from "react";

import "./Accordion.css";

 

function Accordion({ items }) {

  const [openIndex, setOpenIndex] = useState(0);

 

  const toggle = (idx) => {

    setOpenIndex((current) => (current === idx ? -1 : idx));

  };

 

  return (

    <div className="accordion">

      {items.map((item, idx) => {

        const isOpen = openIndex === idx;

        return (

          <div

            key={idx}

            className={`accordion-item${isOpen ? " open" : ""}`}

          >

            <button

              type="button"

              className="accordion-trigger"

              onClick={() => toggle(idx)}

              aria-expanded={isOpen}

            >

              <span>{item.question}</span>

              <span className="accordion-icon">{isOpen ? "−" : "+"}</span>

            </button>

            {isOpen && (

              <div className="accordion-body">{item.answer}</div>

            )}

          </div>

        );

      })}

    </div>

  );

}

 

export default Accordion;

 

