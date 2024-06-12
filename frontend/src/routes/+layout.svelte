<script lang="ts">
  import { onMount } from 'svelte';
  import { tokensStore } from '../stores/tokens';
  import { updateCssVariables } from '../utils/styleUpdater';
  import '../global.scss';

  onMount(() => {
    const unsubscribe = tokensStore.subscribe((tokens) => {
      updateCssVariables(tokens);
    });

    return () => unsubscribe();
  });


</script>

<slot />

<style lang="scss">

// Nesting doesnt work in svelte...

/*
  --[namespace]-[tokentype]-{element}-[property]
  --app-color-primary500 (no element)
  --app-typography-h1-fontSize
*/

:global(:root) {

  ////////////////////////////////////////////////////////////
  // Colors
  ////////////////////////////////////////////////////////////

  // Brand
  --app-color-primary500: #9771c6;
  --app-color-primary700: #643c96;
  --app-color-secondary500: #55dd72;
  --app-color-secondary700: #22aa3f;

  // Neutral
  --app-color-neutral0: #ffffff;
  --app-color-neutral50: #f2f2f2;
  --app-color-neutral100: #e6e6e6;
  --app-color-neutral150: #d9d9d9;
  --app-color-neutral200: #cccccc;
  --app-color-neutral300: #b3b3b3;
  --app-color-neutral400: #999999;
  --app-color-neutral500: #808080;
  --app-color-neutral600: #666666;
  --app-color-neutral700: #4d4d4d;
  --app-color-neutral850: #262626;
  --app-color-neutral900: #1a1a1a;
  --app-color-neutral1000: #000000;

  ////////////////////////////////////////////////////////////
  // Dimensions
  ////////////////////////////////////////////////////////////

  // Border-Radius
  --app-dimension-borderRadius100: 2px;
  --app-dimension-borderRadius200: 4px;
  --app-dimension-borderRadius300: 8px;
  --app-dimension-borderRadius400: 12px;
  --app-dimension-borderRadius500: 16px;

  // Breakpoints ($ evaluated parse time instead of runtime)
  @custom-media --app-dimension-breakpoint300 (min-width: 320px);
  @custom-media --app-dimension-breakpoint400 (min-width: 576px);
  @custom-media --app-dimension-breakpoint500 (min-width: 768px);
  @custom-media --app-dimension-breakpoint600 (min-width: 992px);
  @custom-media --app-dimension-breakpoint700 (min-width: 1248px); 

  ////////////////////////////////////////////////////////////
  // Typography
  ////////////////////////////////////////////////////////////

  --app-typography-fontFamily-primary: "Inter", sans-serif;
  --app-typography-fontFamily-secondary: "Roboto", sans-serif;

  --app-typography-fontWeight300: 300; // Light
  --app-typography-fontWeight400: 400; // Normal
  --app-typography-fontWeight500: 500; // Medium
  --app-typography-fontWeight600: 600; // Semi-Bold

  --app-typography-fontStyle400: "italic"; 
  --app-typography-fontStyle500: "normal";
  --app-typography-fontStyle600: "oblique"; 

  --app-typography-fontSize300: 12px;
  --app-typography-fontSize400: 14px; 
  --app-typography-fontSize500: 16px; 
  --app-typography-fontSize600: 32px; 
  --app-typography-fontSize700: 72px;

  ////////////////////////////////////////////////////////////
  // Composite Tokens
  ////////////////////////////////////////////////////////////

  // Typography
  --app-typography-h1-fontFamily: var(--app-typography-fontFamily-primary);
  --app-typography-h1-fontSize: var(--app-typography-fontSize700);
  --app-typography-h1-fontWeight: var(--app-typography-fontWeight300);

  --app-typography-h2-fontFamily: var(--app-typography-fontFamily-primary);
  --app-typography-h2-fontSize: var(--app-typography-fontSize600);
  --app-typography-h2-fontWeight: var(--app-typography-fontWeight400);

  --app-typography-p-fontFamily: var(--app-typography-fontFamily-primary);
  --app-typography-p-fontSize: var(--app-typography-fontSize500);
  --app-typography-p-fontWeight: var(--app-typography-fontWeight600)

  --app-typography-small-fontFamily: var(--app-typography-fontFamily-primary);
  --app-typography-small-fontSize: var(--app-typography-fontSize300);
  --app-typography-small-fontWeight: var(--app-typography-fontWeight500);

}

/*
  --[namespace]-[component]-{variant}-[property]-{state}
  --app-button-backgroundColor (default)
  --app-button-primary-backgroundColor-disabled (variant:primary, state:disabled)
*/

:global(:root[data-theme="light"]) {

  ////////////////////////////////////////////////////////////
  // Components
  ////////////////////////////////////////////////////////////

  // Body
  --app-body-backgroundColor: var(--app-color-neutral100);
  --app-body-textColor: var(--app-color-neutral900);

  // Button Variant: default
  --app-button-backgroundColor: var(--app-color-neutral150);
  --app-button-textColor: var(--app-color-neutral900);
  --app-button-backgroundColor-hover: var(--app-color-primary500);
  --app-button-textColor-hover: var(--app-color-neutral100);
  --app-button-borderRadius: var(--app-dimension-borderRadius300);

  // Button Variant: "primary"
  --app-button-primary-backgroundColor: var(--app-color-primary500);
  --app-button-primary-textColor: var(--app-color-neutral100);
  --app-button-primary-backgroundColor-hover: var(--app-color-primary700);
  --app-button-primary-textColor-hover: var(--app-color-neutral100);
  --app-button-primary-borderRadius: var(--app-dimension-borderRadius300);

  // Table Variant: default
  --app-table-headingTextColor: var(--app-color-neutral600);
  --app-table-textColor: var(--app-color-neutral100);
  --app-table-colorPreview-borderRadius: var(--app-dimension-borderRadius200);
  
  // Typography
  --app-text-h1-fontFamily: var(--app-typography-h1-fontFamily);
  --app-text-h1-fontSize: var(--app-typography-h1-fontSize);
  --app-text-h1-fontWeight: var(--app-typography-h1-fontWeight);

  --app-text-h2-fontFamily: var(--app-typography-h2-fontFamily);
  --app-text-h2-fontSize: var(--app-typography-h2-fontSize);
  --app-text-h2-fontWeight: var(--app-typography-h2-fontWeight);

  --app-text-p-fontFamily: var(--app-typography-p-fontFamily);
  --app-text-p-fontSize: var(--app-typography-p-fontSize);
  --app-text-p-fontWeight: var(--app-typography-p-fontWeight);

  --app-text-small-fontFamily: var(--app-typography-small-fontFamily);
  --app-text-small-fontSize: var(--app-typography-small-fontSize);
  --app-text-small-fontWeight: var(--app-typography-small-fontWeight);

  // DropdownMenu Variant: default
  --app-dropdown-backgroundColor: var(--app-color-neutral100);
  --app-dropdown-textColor: var(--app-color-neutral900);
  --app-dropdown-backgroundColor-hover: var(--app-color-primary500);
  --app-dropdown-textColor-hover: var(--app-color-neutral100);
  --app-dropdown-borderRadius: var(--app-dimension-borderRadius300);

}

:global(:root[data-theme="dark"]) {

  ////////////////////////////////////////////////////////////
  // Components
  ////////////////////////////////////////////////////////////

  // Body
  --app-body-backgroundColor: var(--app-color-neutral900);
  --app-body-textColor: var(--app-color-neutral100);

  // Button Variant: default
  --app-button-backgroundColor: var(--app-color-neutral850);
  --app-button-textColor: var(--app-color-neutral400);
  --app-button-backgroundColor-hover: var(--app-color-primary500);
  --app-button-textColor-hover: var(--app-color-neutral100);
  --app-button-borderRadius: var(--app-dimension-borderRadius300);

  // Button Variant: "primary"
  --app-button-primary-backgroundColor: var(--app-color-primary500);
  --app-button-primary-textColor: var(--app-color-neutral100);
  --app-button-primary-backgroundColor-hover: var(--app-color-primary700);
  --app-button-primary-textColor-hover: var(--app-color-neutral100);
  --app-button-primary-borderRadius: var(--app-dimension-borderRadius300);

  // Table
  --app-table-headingTextColor: var(--app-color-neutral600);
  --app-table-textColor: var(--app-color-neutral100);
  --app-table-colorPreview-borderRadius: var(--app-dimension-borderRadius300);

  // Typography
  --app-text-h1-fontFamily: var(--app-typography-h1-fontFamily);
  --app-text-h1-fontSize: var(--app-typography-h1-fontSize);
  --app-text-h1-fontWeight: var(--app-typography-h1-fontWeight);

  --app-text-h2-fontFamily: var(--app-typography-h2-fontFamily);
  --app-text-h2-fontSize: var(--app-typography-h2-fontSize);
  --app-text-h2-fontWeight: var(--app-typography-h2-fontWeight);

  --app-text-p-fontFamily: var(--app-typography-p-fontFamily);
  --app-text-p-fontSize: var(--app-typography-p-fontSize);
  --app-text-p-fontWeight: var(--app-typography-p-fontWeight);

  --app-text-small-fontFamily: var(--app-typography-small-fontFamily);
  --app-text-small-fontSize: var(--app-typography-small-fontSize);
  --app-text-small-fontWeight: var(--app-typography-small-fontWeight);

  // DropdownMenu Variant: default
  --app-dropdown-backgroundColor: var(--app-color-neutral850);
  --app-dropdown-textColor: var(--app-color-neutral400);
  --app-dropdown-backgroundColor-hover: var(--app-color-primary500);
  --app-dropdown-textColor-hover: var(--app-color-neutral100);
  --app-dropdown-borderRadius: var(--app-dimension-borderRadius300);

}




@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  
:global(h1) {
    font-family: var(--app-text-h1-fontFamily);
    font-size: var(--app-text-h1-fontSize);
    font-weight: var(--app-text-h1-fontWeight);
    font-optical-sizing: auto;
    font-style: normal;
    font-variation-settings:
      "slnt" 0;
  } 

  :global(p) {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
    font-variation-settings:
      "slnt" 0;
  } 

  :global(small) {
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    font-variation-settings:
      "slnt" 0;
  } 


  :global(body) {
    background-color: var(--app-body-backgroundColor);
    color: var(--app-body-textColor);
    font-family: Helvetica, Arial, sans-serif;
    transition: all .25s;
  }

// Button

  :global(button) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--app-button-backgroundColor);
    color: var(--app-button-textColor);
    border-radius: var(--app-button-borderRadius);
    padding: 8px 12px;
    transition: all 0.25s;

    &:hover {
      text-decoration: none;
      color: var(--app-button-textColor-hover);
      background-color: var(--app-button-backgroundColor-hover);
    }
  }
  

  :global(button[variant="primary"]) {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    background-color: var(--app-button-primary-backgroundColor);
    color: var(--app-button-primary-textColor);
    border-radius: 4px;
    padding: 8px 12px;

    &:hover {
      text-decoration: none;
      background-color: var(--app-button-primary-backgroundColor-hover);
      color: var(--app-button-primary-textColor-hover);
    }
  }
    
  :global(main) {
    padding: 54px 32px;
  }

  :global(#app-wrapper) {
    margin: 0 auto;
    height: 100%;
    max-width: 1100px;
  }

  :global(.list) {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(4, minmax(200px, 300px));
    width: 100%;
    align-items: center;
    padding: 8px 0px;
    border-radius: 4px;
  }

  :global(.color) {
    display: flex;
    align-items: center;
  }

  :global(.cell) {
    //padding: 8px;
  }

  :global(.color-preview) {
    display: inline-block;
    width: 48px;
    height: 32px;
    border-radius: var(--app-table-colorPreview-borderRadius);
    margin: 0 8px 0 0;
  }

/*   :global(button) {
    height: 100%;
    width: auto;
  } */

  :global(.token-container) {
    display: flex;
    align-items: left;
    margin-bottom: 12px;
  }

/*   :global(.token-container) {
    display: contents; 
  } */

  :global(select) {
    margin-top: 1rem;
    padding: 0.5rem;
  }

/*   :global(button) {
    margin-left: 0.5rem;
  } */

  :global(.ellipsis) {
    background-color: var(--system-color-appListBackground);
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: rtl;
    text-align: left;
    padding: 8px;
  }

  :global(.header) {
    text-align: left;
    padding: 8px 0px;
    color: var(--app-table-headingTextColor);
  }


  // Dropdown

  :global(.theme-selector) {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  :global(label) {
    font-size: 1rem;
    color: white;
  }

  :global(.custom-select) {
    position: relative;
    display: inline-block;
  }

  :global(select) {
    appearance: none;
    background-color: #2b2b2b;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 1rem;
    cursor: pointer;
    outline: none;
    padding-right: 40px;
    width: auto;
    min-width: 120px;
  }

  :global(.arrow-icon) {
    position: absolute;
    scale: 1.4;
    top: 50%;
    right: 12px;
    //transform: translateY(-50%);
    pointer-events: none;
    color: white;
  }

  /* Optional: Style the options within the dropdown */
  :global(select option) {
    background-color: #2b2b2b;
    color: white;
  }

  :global(.collection-item) {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  :global(.collection-item input) {
    width: 100%;
  }

  :global(.collection-item span) {
    cursor: pointer;
  }


  :global(.error-message) {
    color: red;
    font-weight: bold;
  }

  // DropdownMenu.svelte

  :global(.dropdown) {
    position: relative;
    display: inline-block;
  }

  :global(.dropdown-button) {
    background-color: var(--app-dropdown-backgroundColor);
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  :global(.dropdown-content) {
    position: absolute;
    background-color: var(--app-dropdown-backgroundColor);
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.5);
    z-index: 1;
    display: flex;
    flex-direction: column;
    border-radius: var(--app-dropdown-borderRadius);
  }
 
  :global(.dropdown-content button) {
    background-color: var(--app-dropdown-backgroundColor);
    color: var(--app-dropdown-textColor);
    border: none;
    padding: 12px 16px;
    text-decoration: none;
    text-align: left;
    width: 100%;
    cursor: pointer;
  }

  :global(.dropdown-content button:hover) {
    background-color: var(--app-dropdown-backgroundColor-hover);
    color: var(--app-dropdown-textColor-hover);
  }


  // Muss von app generiert werden
  @media (--app-dimension-breakpoint300) {
    :global(h1) {
      font-size: var(--app-typography-fontSize500);
    }
  }

  @media (--app-dimension-breakpoint400) {
    :global(h1) {
      font-size: var(--app-typography-fontSize500);
    }
  }

  @media (--app-dimension-breakpoint500) {
    :global(h1) {
      font-size: var(--app-typography-fontSize600);
    }
  }

  @media (--app-dimension-breakpoint600) {
    :global(h1) {
      font-size: var(--app-typography-fontSize700);
    }
  }

  @media (--app-dimension-breakpoint700) {
    :global(h1) {
      font-size: var(--app-typography-fontSize700);
    }
  }

</style>
