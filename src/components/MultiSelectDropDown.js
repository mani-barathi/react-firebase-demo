import React, { useEffect, useRef, useState } from "react";
import "../styles/custom-dropdown.css";

const KEYS = {
  ENTER: "Enter",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ESCAPE: "Escape",
  SPACE: "Space",
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
      block: "nearest",
    });
  }, [currentIndex]);

  function closeDropDown() {
    setOpen(false);
  }

  function openDropDown() {
    setCurrentIndex(0);
    setOpen(true);
  }

  function handleKeyDown(e) {
    const key = e.code;
    if (!Object.values(KEYS).includes(key)) {
      return;
    }
    e.preventDefault();

    switch (key) {
      case KEYS.ARROW_UP: {
        if (!open) {
          openDropDown();
          break;
        }
        if (currentIndex === 0) return;
        setCurrentIndex((prevIndex) => prevIndex - 1);
        break;
      }

      case KEYS.ARROW_DOWN: {
        if (!open) {
          openDropDown();
          break;
        }
        if (currentIndex === optionList.length - 1) return;
        setCurrentIndex((prevIndex) => prevIndex + 1);
        break;
      }

      case KEYS.ENTER:
      case KEYS.SPACE: {
        if (!open) {
          openDropDown();
          break;
        }
        const option = optionList[currentIndex];
        addOrRemoveOption(option, currentIndex);
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

  function addOrRemoveOption(option, index) {
    let newSelectedValue = [];

    if (selectedValue.includes(option)) {
      newSelectedValue = selectedValue.filter((item) => option !== item);
    } else {
      newSelectedValue = [...selectedValue, option];
    }

    setSelectedValue(newSelectedValue);
  }

  function handleOptionClick(option, index, e) {
    e.stopPropagation();
    addOrRemoveOption(option, index);
  }

  function handleDeleteOption(option, e) {
    const newSelectedValue = selectedValue.filter((item) => option !== item);
    setSelectedValue(newSelectedValue);
    e.stopPropagation();
  }

  function handleOnBlur(e) {
    console.log(e.target, e.relatedTarget);
    if (e.relatedTarget && e.target.contains(e.relatedTarget)) {
      return;
    }
    closeDropDown();
  }

  return (
    <div>
      <label className="label">{label}</label>
      <div
        onKeyDown={handleKeyDown}
        tabIndex="0"
        onClick={() => (open ? closeDropDown() : openDropDown())}
        className="dropdown form-input"
        onBlur={handleOnBlur}
      >
        <div className="dropdown-value">
          {selectedValue.length !== 0 ? (
            selectedValue.map((value) => (
              <span
                className="option-button"
                onClick={(e) => handleDeleteOption(value, e)}
                type="button"
                key={value}
              >
                {value} <span>&#10006;</span>
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
                onClick={(e) => handleOptionClick(option, index, e)}
                // onMouseOver={(e) => setCurrentIndex(index)}
                key={option}
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
