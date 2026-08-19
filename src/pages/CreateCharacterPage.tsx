import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import type { Character } from '../types/character';

type CreateCharacterPageProps = {
  onAddCharacter: (character: Character) => void;
};

type FormValues = {
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  image: string;
};

function createLocalCharacterId(): number {
  const randomValues = new Uint32Array(1);
  crypto.getRandomValues(randomValues);

  return -randomValues[0];
}

export default function CreateCharacterPage({
  onAddCharacter,
}: CreateCharacterPageProps) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm<FormValues>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  function isValidImageUrl(value: string): boolean {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  function onSubmit(data: FormValues): void {
    const newCharacter: Character = {
      id: createLocalCharacterId(),
      name: data.name.trim(),
      status: data.status,
      species: data.species.trim(),
      type: '',
      gender: data.gender,
      image: data.image.trim(),
      origin: {
        name: 'unknown',
        url: '',
      },
      location: {
        name: 'unknown',
        url: '',
      },
    };

    onAddCharacter(newCharacter);

    navigate('/characters');
  }

  return (
    <main>
      <h1>Create Character</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>

          <input
            id="name"
            type="text"
            placeholder="Enter character name"
            {...register('name', {
              required: 'Name is required.',
              minLength: {
                value: 2,
                message: 'Name must contain at least 2 characters.',
              },
              maxLength: {
                value: 50,
                message: 'Name must not exceed 50 characters.',
              },
              onChange: async (event) => {
                if (event.target.value.trim().length >= 2) {
                  await trigger('name');
                }
              },
            })}
          />

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="status">Status</label>

          <select
            id="status"
            defaultValue=""
            {...register('status', {
              required: 'Please select a status.',
            })}
          >
            <option value="" disabled>
              Select status
            </option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          {errors.status && <p>{errors.status.message}</p>}
        </div>

        <div>
          <label htmlFor="species">Species</label>

          <input
            id="species"
            type="text"
            placeholder="Enter character species"
            {...register('species', {
              required: 'Species is required.',
              minLength: {
                value: 2,
                message: 'Species must contain at least 2 characters.',
              },
              maxLength: {
                value: 50,
                message: 'Species must not exceed 50 characters.',
              },
              onChange: async (event) => {
                if (event.target.value.trim().length >= 2) {
                  await trigger('species');
                }
              },
            })}
          />

          {errors.species && <p>{errors.species.message}</p>}
        </div>

        <div>
          <label htmlFor="gender">Gender</label>

          <select
            id="gender"
            defaultValue=""
            {...register('gender', {
              required: 'Please select a gender.',
            })}
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>

          {errors.gender && <p>{errors.gender.message}</p>}
        </div>

        <div>
          <label htmlFor="image">Image URL</label>

          <input
            id="image"
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register('image', {
              required: 'Image URL is required.',
              validate: {
                validUrl: (value) =>
                  isValidImageUrl(value) ||
                  'Please enter a valid HTTP or HTTPS URL.',
              },
              onChange: async (event) => {
                if (isValidImageUrl(event.target.value)) {
                  await trigger('image');
                }
              },
            })}
          />

          {errors.image && <p>{errors.image.message}</p>}
        </div>

        <button type="submit" disabled={!isValid}>
          Save Character
        </button>
      </form>
    </main>
  );
}
