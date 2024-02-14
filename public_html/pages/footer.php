<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Footer du site Eirb</title>
    <link rel="stylesheet" href="/assets/css/style.css">
    <style>
        .footer a {
            text-decoration: none;
            color: #333; 
            background-image: var(--link-icon); 
            background-repeat: no-repeat; 
            background-position: right center; 
            padding-right: 20px; 
        }

        .footer a:hover {
            color: #000;
            text-decoration: underline; 
        }

        .footer {
            padding-top: 2.5rem;
            box-shadow: inset 0 3px 0 0 var(--primary), inset 0 -1px 0 0 var(--default-gray);
            padding-bottom: 20px;
            text-align: center;
            background-color: #f0f0f0;
        }

        .fr-container {
            margin-left: auto;
            margin-right: auto;
            padding-left: 1rem;
            padding-right: 1rem;
        }

        .footer-logo {
            width: 64px; 
            height: auto; 
        }

        .footer-links {
            font-size: 0.9rem;
            display: flex;
            justify-content: flex-end; 
            align-items: center; 
            flex-grow: 1; 
        }

        .footer-links ul {
            list-style: none;
            padding: 0;
            margin: 0; 
            display: flex; 
        }

        .footer-links ul li {
            margin-left: 10px; 
        }

        .footer-links ul li:first-child {
            margin-left: 0; 
        }

        .footer-copyright {
            font-size: 0.8rem;
            text-align: center;
            margin-top: 20px;
        }

        .footer-body {
            padding: 20px;
            display: flex;
            align-items: center; 
            flex-wrap: wrap; 
            justify-content: center; 
        }

        .footer-bottom {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            margin-top: 2.5rem;
            box-shadow: inset 0 1px 0 0 var(--default-gray)
        }

        /* Media queries pour les styles mobiles */
        @media screen and (max-width: 768px) {
            .footer-logo {
                width: 64px;
                height: auto;
                padding-bottom: 10px;
            }
            .footer-body {
                flex-direction: column;
                text-align: center; 
            }
            .footer-links ul {
                flex-direction: column; 
                align-items: center; 
            }

            .footer-links ul li {
                margin-left: 0; 
                margin-bottom: 10px; 
            }
        }
    </style>
</head>
<body>
    <footer class="footer">
        <div class="fr-container">
            <div class="footer-body">
                <img src="/assets/images/eirbware.png" alt="Eirb" class="footer-logo">
                <div class="footer-links">
                    <ul>
                        <li><a href="https://eirb.fr">eirb.fr</a></li>
                        <li><a href="https://eirbware.eirb.fr">eirbware.eirb.fr</a></li>
                        <li><a href="https://bde.eirb.fr">bde.eirb.fr</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="footer-copyright">
                    <p>&copy; <?php echo date("Y"); ?> Eirbware - <a href="https://eirbware.eirb.fr/">Tous droits réservés</a></p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
