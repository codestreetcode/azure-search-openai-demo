import { Spinner } from "@fluentui/react";
import { useRef, useState } from "react";

import { Outlet, NavLink, Link } from "react-router-dom";

import github from "../../assets/github.svg";

import styles from "./Layout.module.css";

const Layout = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>();

    // the react post request sender
    const uploadFile = async (e:any) => {
        e.preventDefault();
        
        setIsLoading(true);
        
        const files = e.target.files; //? [...e.target.files] : [];
        
        if (files != null) {
        const data = new FormData();

            for (let i = 0; i < files.length; i++) {
                data.append("files[]", files[i]);
            }

            try{
                let response = await fetch('/upload',
                {
                    method: 'post',
                    body: data,
                }
                );
                let res = await response.json();
            //   if (res.status !== 1){
            //     alert('Error uploading file');
            //   }
                if (res.status > 299 || !res.ok) {
                throw Error(res.error || "Unknown error");
                }

            } catch (e) {
                setError(e);
            } finally {
                setIsLoading(false);
                // var delayInMilliseconds = 1000; //1 second

                // setTimeout(function() {
                // //your code to be executed after 1 second
                // setIsLoading(false);
                // }, delayInMilliseconds);

                
            }
        }
    };

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <h3 className={styles.headerTitle}>GPT + Enterprise data | Sample</h3>
                    </Link>
                    <nav>
                        <ul className={styles.headerNavList}>
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Chat
                                </NavLink>
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                <NavLink to="/qa" className={({ isActive }) => (isActive ? styles.headerNavPageLinkActive : styles.headerNavPageLink)}>
                                    Ask a question
                                </NavLink>
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                { (!isLoading) && 
                                <label className={styles.uploadingContainer}>
                                    <input hidden type="file" id="avatar" name="avatar" multiple={true}
                                    accept="application/pdf,application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    onChange={uploadFile}/>
                                    Upload documents 
                                </label>
                                }                                
                                {isLoading && <div className={styles.uploadingContainer}>
                                    <span className={styles.uploading}>Uploading</span><Spinner/></div>}
                            </li>
                            <li className={styles.headerNavLeftMargin}>
                                <a href="https://aka.ms/entgptsearch" target={"_blank"} title="Github repository link">
                                    <img
                                        src={github}
                                        alt="Github logo"
                                        aria-label="Link to github repository"
                                        width="20px"
                                        height="20px"
                                        className={styles.githubLogo}
                                    />
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <h4 className={styles.headerRightText}>Azure OpenAI + Cognitive Search</h4>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
