"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInavalidText(text) {
  return !text || text.trim() === "";
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instrctions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInavalidText(meal.title) ||
    isInavalidText(meal.summary) ||
    isInavalidText(meal.instrctions) ||
    isInavalidText(meal.creator) ||
    isInavalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
        message: 'Invalid input.'
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals', 'layout');
  redirect("/meals");
}
