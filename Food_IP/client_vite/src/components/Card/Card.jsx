import React from 'react';
import styles from './Card.module.css'
import { useNavigate } from 'react-router-dom'


export default function Card(props) {
    const navigate = useNavigate();
    const toDetail = () => {
        navigate(`/detailrecipe/${props.id}`)
    }
    const { title, img, health_score, diets } = props;

    return (
        <div key={props.id} className={styles.card} >
            <h6>{health_score}</h6>
            
            <img src={props.img} alt={title} className={styles.img} onClick={toDetail}/>
            <h3>{title}</h3>
            <br />
            <div className={styles.diets}>
                {diets?.map((diet, i) => ( //para recorrer la lista de dietas
                    //para agrupar varios elementos en 1 solo bloque
                    <React.Fragment key={i}>
                        <span className={styles.diet}>{diet.charAt(0).toUpperCase() + diet.slice(1)}</span>
                        {i < diets.length - 1 && <span className={styles.separator}> - </span>}
                    </React.Fragment>
                ))}
            </div>
            <button onClick={toDetail} className={styles.detail}>visualize</button>
        </div>
    )
}
