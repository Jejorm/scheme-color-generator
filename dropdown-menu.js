let focusedIndex = -1;

document.addEventListener('DOMContentLoaded', () => {

  const customSelects = document.querySelectorAll('.custom-select')

  customSelects.forEach((customSelect) => {

    const selectButton = customSelect.querySelector('.select-button')

    selectButton.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()

        toggleDropdown(true)
      } else if (event.key === 'Escape') {
        toggleDropdown(false)
      }
    });

    const selectedValue = selectButton.querySelector('.selected-value')

    const dropdown = customSelect.querySelector('.select-dropdown')

    dropdown.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        focusedIndex = (focusedIndex + 1) % options.length
        updateFocus()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        focusedIndex = (focusedIndex - 1 + options.length) % options.length;
        updateFocus()
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOptionSelect(options[focusedIndex]);
        toggleDropdown(false);
      } else if (event.key === 'Escape') {
        toggleDropdown(false);
      }
    });

    const options = dropdown.querySelectorAll('li')

    const handleOptionSelect = (option) => {
      options.forEach((opt) => opt.classList.remove('selected'))

      option.classList.add('selected')

      selectedValue.textContent = option.textContent.trim()
    };

    options.forEach((option) => {
      option.addEventListener('click', () => {
        handleOptionSelect(option)
        toggleDropdown(false)
      });
    });

    const updateFocus = () => {
      options.forEach((option, index) => {
        if (option) {
          option.setAttribute('tabindex', index === focusedIndex ? '0' : '-1')
          if (index === focusedIndex) option.focus()
        }
      });
    };

    const toggleDropdown = (expand = null) => {
      const isOpen = expand ?? dropdown.classList.contains("hidden")

      dropdown.classList.toggle('hidden', !isOpen)

      selectButton.setAttribute('aria-expanded', isOpen)

      if (isOpen) {
        focusedIndex = [...options].findIndex((option) => option.classList.contains('selected'))

        focusedIndex = focusedIndex === -1 ? 0 : focusedIndex

        updateFocus();
      } else {
        focusedIndex = -1

        selectButton.focus()
      }
    }

    selectButton.addEventListener('click', () => {
      toggleDropdown();
    })

    document.addEventListener('click', (event) => {
      const isOutsideClick = !customSelect.contains(event.target)
      isOutsideClick && toggleDropdown(false)
    });
  })
})
