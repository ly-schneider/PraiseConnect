"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./utils/Spinner";
import { JWTPayload } from "jose";
import { Activities } from "@/utils/Activities";
import { PostDTO } from "@/model/Post";

interface PostErstellenFormErrors {
  submit: string;
  content: string;
  activities: string;
}

const initialErrors: PostErstellenFormErrors = {
  submit: "",
  content: "",
  activities: "",
};

export default function PostErstellenForm({
  session,
}: {
  session: { accessToken: string; user: JWTPayload } | null;
}) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [activities, setActivities] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<PostErstellenFormErrors>({
    ...initialErrors,
  });

  function toggleActivity(event: React.MouseEvent<HTMLButtonElement>, activity: string) {
    event.preventDefault();
    event.stopPropagation();
  
    setActivities((prevActivities) => {
      if (prevActivities.includes(activity)) {
        return prevActivities.filter((a) => a !== activity);
      } else {
        return [...prevActivities, activity];
      }
    });
  
    event.currentTarget.blur();
  }

  function isActivitySelected(activity: string) {
    return activities.includes(activity);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrors(initialErrors);

    const errors = { ...initialErrors };

    if (!content) {
      errors.content = "Bitte gib eine Nachricht ein.";
    }

    Object.keys(errors).forEach((key) => {
      if (errors[key as keyof PostErstellenFormErrors]) {
        setLoading(false);
        setErrors(errors);
        return;
      }
    });

    try {
      const body: PostDTO = {
        content,
        activities,
      };

      const res = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        setLoading(false);
        router.push(`/posts/id/${data.data._id}`);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
      setErrors({
        ...errors,
        submit: "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      });
      return;
    }
  }

  return (
    <div className="mt-6">
      {errors.submit && (
        <div className="rounded-[20px] bg-error px-4 py-2.5 text text-center mb-4">
          {errors.submit}
        </div>
      )}
      <form onSubmit={handleLogin}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text">
              Nachricht:
            </label>
            <textarea
              id="content"
              className="input rounded-[20px]"
              placeholder="Gib deine Nachricht ein"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
            />
            {errors.content && (
              <span className="text text-error">{errors.content}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text">Aktivität auswählen die zum Post passt:</p>
            <ul className={`flex flex-wrap gap-2`}>
              {Object.values(Activities).map((activity) => (
                <li key={activity}>
                  <button
                    className={`btn px-4 py-2 text-xs ${
                      isActivitySelected(activity)
                        ? "btn-attention"
                        : "btn-primary"
                    }`}
                    onClick={(e) => toggleActivity(e, activity)}
                    type="button"
                  >
                    {activity}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="btn btn-attention w-full mt-4" type="submit">
          <Spinner
            className={
              "fill-background transition-default " +
              (loading ? "mr-3" : "hidden")
            }
          />
          Erstellen
        </button>
      </form>
    </div>
  );
}
