import React, { useEffect, useRef, useState } from "react";
import "../styles/custom-dropdown.css";

const KEYS = {
  ENTER: "Enter",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ESCAPE: "Escape",
};

function MultiSelectDropDown(props) {
  const { optionList, setSelectedValue, selectedValue, label } = props;
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const currentOptionRef = useRef();

  useEffect(() => {
    if (!currentOptionRef.current) return;

    currentOptionRef.current?.scrollIntoView({
      behaviour: "smooth",
      block: "center",
    });
  }, [currentIndex]);

  function handleKeyDown(e) {
    const key = e.key;

    switch (key) {
      case KEYS.ARROW_UP: {
        if (currentIndex === 0) return e.preventDefault();
        setCurrentIndex((prevIndex) => prevIndex - 1);
        e.preventDefault();
        break;
      }

      case KEYS.ARROW_DOWN: {
        if (currentIndex === optionList.length - 1) return e.preventDefault();
        setCurrentIndex((prevIndex) => prevIndex + 1);
        e.preventDefault();
        break;
      }

      case KEYS.ENTER: {
        if (!open) {
          openDropDown();
          break;
        }
        const option = optionList[currentIndex];
        handleOptionClick(option, currentIndex);
        break;
      }

      case KEYS.ESCAPE: {
        closeDropDown();
        break;
      }

      default:
        break;
    }
  }

  function closeDropDown() {
    setCurrentIndex(-1);
    setOpen(false);
  }

  function openDropDown() {
    setCurrentIndex(-1);
    setOpen(true);
  }

  function handleOptionClick(option, index) {
    let newSelectedValue = [];

    if (selectedValue.includes(option)) {
      newSelectedValue = selectedValue.filter((item) => option !== item);
    } else {
      newSelectedValue = [...selectedValue, option];
    }

    setSelectedValue(newSelectedValue);
  }

  function handleDeleteOption(option, e) {
    const newSelectedValue = selectedValue.filter((item) => option !== item);
    setSelectedValue(newSelectedValue);
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div
        onKeyDown={handleKeyDown}
        tabIndex="0"
        onClick={openDropDown}
        className="dropdown form-input"
        onBlur={closeDropDown}
      >
        <div>
          {selectedValue.length !== 0 ? (
            selectedValue.map((value) => (
              <span className="option-button">
                {value}{" "}
                <span onClick={(e) => handleDeleteOption(value, e)}>
                  &#10006;
                </span>
              </span>
            ))
          ) : (
            <span className="light-text">Select from dropdown</span>
          )}
        </div>
        {open && (
          <ul className="dropdown-list">
            {optionList.map((option, index) => (
              <li
                className={`dropdown-list-item ${
                  index === currentIndex ? "hoverd" : ""
                }
                ${selectedValue.includes(option) ? " selected" : ""} 
                `}
                ref={currentIndex === index ? currentOptionRef : null}
                onClick={() => handleOptionClick(option, index)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MultiSelectDropDown;
