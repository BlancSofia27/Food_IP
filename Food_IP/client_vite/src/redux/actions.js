import {
    ADD_RECIPE,
    FILTER_BY_DIETS,
    FILTER_BY_ORIGIN,
    HEALTH_SCORE_ORDER,
    ALPHABETIC_ORDER,
    GET_ALL_RECIPES,
    GET_DETAIL_RECIPE,
    SET_LOADING,
    GET_DIETS,
    CLEAN_STATES,
} from "./actions-types"
import axios from "axios";

export const setLoading = (isLoading) => { //para cambiar el estado de carga de la aplicacion
    return {
        type: SET_LOADING,
        payload: isLoading,
    };
};
export const addRecipe = (recipe) => { //para agregar una nueva receta
    return async function (dispatch) {
        try {
            const response = await axios.post("http://localhost:3001/recipes/postRecipe", recipe);
            return dispatch({ type: ADD_RECIPE, payload: response.data });
        } catch (error) {
            console.log(error.message);
            alert("No se pudo crear receta");
        }
    };
};
export const getAllRecipes = () => { //para obtener todas las recetas
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            console.log('ejecutando action');
            const response = await axios.get("http://localhost:3001/recipes/");
            console.log('ejecutando action 2');
            dispatch({ type: GET_ALL_RECIPES, payload: response.data });
            dispatch(setLoading(false));
        } catch (error) {
            console.log("No se encontraron recetas");
        }
    };
};
export const getQueryRecipe = (title) => { //para obtener recetas segun el nombre
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(
                `http://localhost:3001/recipes/name?name=${title}`
            );
            dispatch({ type: GET_ALL_RECIPES, payload: response.data });
            dispatch(setLoading(false));
        } catch (error) {
            alert("No encontré la receta que estás buscando");
        }
    };
};
export const getDetail = (id) => { //para obtener los detalles de una receta segun su id
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(`http://localhost:3001/recipes/${id}`);
            dispatch({ type: GET_DETAIL_RECIPE, payload: response.data });
            dispatch(setLoading(false));
        } catch (error) {
            alert("No existe la receta con el ID indicado");
        }
    };
};
export const getDiets = () => { //para obtener los tipos de dietas disponibles
    return async function (dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/diets/");
            dispatch({ type: GET_DIETS, payload: response.data });
        } catch (error) {
            console.log("Mi base de datos no tiene las dietas solicitadas");
        }
    };
};
export const filterRecipeByDiets = (Diet) => { //para filtrar las recetas por tipos de dieta
    return {
        type: FILTER_BY_DIETS,
        payload: Diet,
    };
};
export const orderRecipeAlphabetic = (option) => { //para ordenar las recetas alfabeticamente
    return {
        type: ALPHABETIC_ORDER,
        payload: option,
    };
};
export const filterByOrigin = (origin) => { //para filtrar las recetas por origen
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin,
    };
};
export const healthScoreOrder = (score) => { //para ordenar las recetas por puntuacion de salud
    return {
        type: HEALTH_SCORE_ORDER,
        payload: score,
    };
};
export const deleteFilters = () => { //para eliminar los filtros aplicados en las recetas
    return {
        type: "DELETE_FILTERS"
    }
};
export const cleanStates = () => { //para limpiar o reiniciar los estados de la aplicacion
    return {
        type: CLEAN_STATES
    }
};
