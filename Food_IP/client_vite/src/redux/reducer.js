import {
  ADD_RECIPE,
  GET_ALL_RECIPES,
  GET_QUERY_RECIPE,
  GET_DIETS,
  FILTER_BY_DIETS,
  FILTER_BY_ORIGIN,
  HEALTH_SCORE_ORDER,
  ALPHABETIC_ORDER,
  SET_LOADING,
  GET_DETAIL_RECIPE,
  CLEAN_STATES,
} from "./actions-types";

const initialState = {
  myRecipes: [],
  loading: false,
  detail: {},
  diets: [],
};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING: //Actualiza el estado loading con el valor de payload
      return {
        ...state,
        loading: payload,
      };
    case ADD_RECIPE: //Agrega la receta proporcionada en payload tanto a myRecipes como a allRecipes
      return {
        ...state,
        myRecipes: [...state.myRecipes, payload],
        allRecipes: [...state.allRecipes, payload]
      };
    case GET_ALL_RECIPES: //Actualiza tanto myRecipes como allRecipes con las recetas proporcionadas en payload
      return {
        ...state,
        myRecipes: payload,
        allRecipes: payload
      };
    case GET_QUERY_RECIPE: //Actualiza myRecipes con las recetas filtradas proporcionadas en payload
      return {
        ...state,
        myRecipes: payload,
      }
    case GET_DIETS: //Actualiza diets con los tipos de dietas proporcionados en payload
      return {
        ...state,
        diets: payload
      }
    case GET_DETAIL_RECIPE: //Actualiza detail con el detalle de la receta proporcionada en payload
      return {
        ...state,
        detail: payload,
      };
    case FILTER_BY_DIETS: //Filtra las recetas en allRecipes basándose en el tipo de dieta proporcionado en payload y actualiza myRecipes con las recetas filtradas
    
      {
        const allRecipesFiltered = state.allRecipes.filter(
          (recipe) => recipe.diets.includes(payload)
        );
        return {
          ...state,
          myRecipes: allRecipesFiltered,
        };
      }
    
    case ALPHABETIC_ORDER: //Ordena las recetas en myRecipes alfabéticamente según el criterio especificado en payload
      return {
        ...state,
        myRecipes:
          payload === "A-Z"
            ? state.myRecipes.sort((a, b) => a.title.localeCompare(b.title))
            : state.myRecipes.sort((a, b) => b.title.localeCompare(a.title)),
      };
    case HEALTH_SCORE_ORDER: //Ordena las recetas en myRecipes según la puntuación de salud en orden ascendente o descendente según el criterio especificado en payload
      return {
        ...state,
        myRecipes:
          payload === "Ascendente"
            ? state.myRecipes.sort((a, b) => (a.healthScore < b.healthScore ? -1 : 1))
            : state.myRecipes.sort((a, b) => (a.healthScore > b.healthScore ? -1 : 1)),
      };
      case FILTER_BY_ORIGIN: //Filtra las recetas en allRecipes según el origen especificado en payload y actualiza myRecipes con las recetas filtradas
         {
        const filtered = state.allRecipes.filter((recipe) => {
          const regExp = /^[0-9]+$/;
          if (payload === 'Api' && regExp.test(recipe.id)) {
            return true;
          } else if (payload === 'DataBase' && !regExp.test(recipe.id)) {
            return true;
          } else {
            return false;
          }
        });
        return {
          ...state,
          myRecipes: filtered
        };
      }
      
      
    case "DELETE_FILTERS": // Restablece myRecipes con todas las recetas en allRecipes
      return {
        ...state,
        myRecipes: state.allRecipes
      }
    case CLEAN_STATES: //Limpia el estado detail restableciéndolo a un objeto vacío
      return {
        ...state,
        detail: {}
      };
    default:
      return { ...state };
  }
};

export default reducer;
