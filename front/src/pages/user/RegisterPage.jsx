import { useCallback, useState } from "react";
import * as authService from "../../services/auth.service";
import { Link } from "react-router-dom";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState([]);

  const onChangeField = useCallback(
    (event, setValue, errorMessage) => {
      const fieldValue = event.target.value;
      const hasError = errors.includes(errorMessage);

      if (fieldValue.length < 3 && !hasError) {
        setErrors([...errors, errorMessage]);
      } else if (fieldValue.length >= 3 && hasError) {
        setErrors(errors.filter((errorMsg) => errorMsg !== errorMessage));
      }

      setValue(fieldValue);
    },
    [errors]
  );

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (errors.length === 0) {
        return authService
          .register({ name, email, userName, password })
          .then(() => {
            setSuccess(true);
            setErrors([]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [name, email, userName, password, errors]
  );

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container login-page">
      <div className="row justify-content-center div-portada container-register">
        <div className="col-12 col-md-10 col-lg-7 col-xl-6 caja-login">
          {success ? (
            <div className="titulo-seccion text-center">
              <h3 className="naranja">Registrado con éxito</h3>
              {/* <p> Te hemos enviado un mail de bienvenida a {email}</p> */}
              <p>
                ¡Te damos la bienvenida, {name}! Ya podés acceder a tu cuenta
              </p>
              <Link
                className="btn btn-azul w-10 mt-4 btn-success-login"
                to="/login"
              >
                Iniciá sesión en tu cuenta
              </Link>
            </div>
          ) : (
            <>
              <div className="col-12 titulo-seccion text-center pb-0">
                <h2>Creá tu cuenta</h2>
              </div>

              <form className="form-login" onSubmit={onSubmit}>
                <label className="col-12 form-login__field">
                  Nombre de usuario
                </label>
                <input
                  className="form-login__username w-100"
                  type="text"
                  name="userName"
                  onChange={(event) =>
                    onChangeField(
                      event,
                      setUserName,
                      "El nombre de usuario debe tener al menos 3 caracteres"
                    )
                  }
                  value={userName}
                />
                <label className="col-12 form-login__field">
                  Nombre y apellido
                </label>
                <input
                  className="form-login__username w-100"
                  type="text"
                  name="name"
                  onChange={(event) =>
                    onChangeField(
                      event,
                      setName,
                      "El nombre debe tener al menos 3 caracteres"
                    )
                  }
                  value={name}
                />

                <label className="col-12 form-login__field">Email</label>
                <input
                  className="form-login__username w-100"
                  type="email"
                  name="email"
                  onChange={(event) =>
                    onChangeField(
                      event,
                      setEmail,
                      "El email debe tener un formato válido"
                    )
                  }
                  value={email}
                />

                <label className="col-12 form-login__field">
                  Contraseña{" "}
                  <small>
                    {" "}
                    <br /> Debe contener mínimo 8 caracteres
                  </small>{" "}
                </label>
                {/* <input
              className="form-login__password w-100"
              type="password"
              name="password"
              onChange={(event) =>
                onChangeField(
                  event,
                  setPassword,
                  "La contraseña debe tener al menos 8 caracteres"
                )
              }
              value={password}
            />
            
            */}

                <div className="password-wrapper">
                  <input
                    className="form-login__password w-100"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={(event) =>
                      onChangeField(
                        event,
                        setPassword,
                        "La contraseña debe tener al menos 8 caracteres"
                      )
                    }
                    value={password}
                  />
                  <div
                    className="password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashFill color="#d3970f" />
                    ) : (
                      <EyeFill color="#d3970f" />
                    )}
                  </div>
                </div>

                {errors.length > 0 && (
                  <div className="errors">
                    {errors.map((errorMsg, index) => (
                      <p key={index} className="text-danger">
                        {errorMsg}
                      </p>
                    ))}
                  </div>
                )}
                <button
                  className="form-login__submit btn btn-naranja w-100 mt-4"
                  type="submit"
                  disabled={errors.length > 0}
                >
                  Crear cuenta
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
