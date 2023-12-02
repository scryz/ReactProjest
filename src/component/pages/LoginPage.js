import "./login.css";
const LoginPage = () => {
    return (
       
       <main className="login_block">
                <div className="logo">GetGether</div>
                <div className="login_text">Войдите в аккаунт</div>
                <div className="login">
                <div className="input-form">
                    <input type="text" placeholder="Ник/E-mail"/>
                </div>
                <div className="input-form">
                    <input type="password" placeholder="Пароль"/>
                </div>
                <button>Войти</button>
                </div>
                    <footer className="nav">
                        <a className="nav_link" href="reg.html">Не помню пароль</a>
                        <a className="nav_link" href="reg.html">Создать учётную запись</a>
                    </footer>
              
            </main>
            
       
    );
}
export default LoginPage;