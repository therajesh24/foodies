import { getMeal } from "@/lib/meals";
import Image from "next/image";
import { notFound } from "next/navigation";
import classes from './page.module.css';

export default function MealDetailsPage({ params }) {
    const meal = getMeal(params.mealSlug);

    if(!meal) {
        notFound()
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br />')

    return <>
    <header className={classes.header}>
        <div className={classes.image}>
            <Image src={meal.image} fill />
        </div>
        <div className={classes.headerText}>
            <h1>{meal.title}</h1>
            <p className={classes.creator}>by ${meal.creator_email}</p>
            <p className={classes.summary}>{meal.summary}</p>
        </div>
    </header>
    <main>
        <p className={classes.instructions} dangerouslySetInnerHTML={{
            __html: meal.instructions,
        }}></p>
    </main>
    </>
}