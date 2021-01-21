import React from 'react';
import { StyleSheet, View, Button, PixelRatio } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';
import { isIos, isWeb } from '@layout';
import { szlhLogo } from '@strings';
import get from 'lodash/get';
import { getGameData, EGameDetail, getDateString } from '@utils';
import { useSelector } from 'react-redux';
import { IGameDetail } from './GameScreen';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    contentContainer: {
        alignItems: 'center'
    },
    button: {
        margin: 20,
        maxWidth: 200
    }
});

const scaledValue = (value: number) => (isIos ? value : (value * 4) / 3);

export default function PDFScreen({ route }: any) {
    const gameId = get(route, 'params.gameId', '');
    const gameData = getGameData(gameId);
    const { mesto, auto, season: currentSeason } = useSelector(state => get(state, 'auth.profile'));
    const userName = useSelector(state => get(state, 'auth.user.displayName', ''));

    const gameUserData: IGameDetail = useSelector(state =>
        get(state, `userGames.seasons.${currentSeason}.${gameId}`, {})
    );

    const gamePage = `
        <div class="wrapper">
            <div class="flex-container" >
                <img height="${scaledValue(50)}px" src="${szlhLogo}"/>
                <div style="flex-direction: column; min-width: ${scaledValue(
                    472
                )}px; align-items: center;">
                    <div style="justify-content: center; margin: ${scaledValue(5)}px 0px; 
                    max-width: ${scaledValue(270)}px; text-align: center;
                        font-size: ${scaledValue(11)}px; line-height: ${scaledValue(12)}px;">
                            <strong>SLOVENSKÝ ZVÄZ ĽADOVÉHO HOKEJA VYÚČTOVANIE</strong>
                    </div>
                    <div style=" margin: ${scaledValue(5)}px 0px; max-width: ${scaledValue(340)}px; 
                        text-align: center; font-size: ${scaledValue(11)}px; 
                        line-height: ${scaledValue(12)}px;">
                            CESTOVNÝCH VÝDAVKOV ROZHODCU, INŠTRUKTORA ROZHODCOV A VIDEOBRÁNKOVÉHO ROZHODCU
                    </div>
                </div>
                <img height="${scaledValue(50)}px" src="${szlhLogo}"/>
            </div>
            <div class="flex-container">
                <div style="flex-grow: 3">Súťaž:
                    <div class="text-dotted">${gameData.ligue}</div>
                </div>
                <div style="flex-grow: 2">Číslo stretnutia:
                    <div class="text-dotted">${gameData.gameId}</div>
                </div>
                <div style="flex-grow: 3">Dátum stretnutia:
                    <div class="text-dotted">${gameData.date}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="flex-grow: 3">Úradný začiatok stretnutia (čas):
                    <div class="text-dotted">${gameData.time}</div>
                </div>
                <div style="flex-grow: 2">Stretnutie sa hralo v pracovný deň pred 16:00 hod:
                    <strong> ANO</strong>
                    <input type="checkbox" ${gameUserData.playedBefore && 'checked'} />
                </div>
            </div>
            <div class="flex-container">
                <div style="flex-grow: 1">Domáci:
                    <div class="text-dotted">${gameData.home}</div>
                </div>
                <div style="flex-grow: 1">Hostia:
                    <div class="text-dotted">${gameData.away}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="flex-grow: 1">Stretnutie sa hralo:
                    <strong>HRALO</strong>
                    <input type="checkbox" ${gameUserData.played && 'checked'} />-
                    <strong>NEHRALO</strong>
                    <input type="checkbox" ${!gameUserData.played && 'checked'} />na ZŠ v:
                    <div class="text-dotted">${gameData.stadium}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="flex-grow: 1">Meno a priezvisko:
                    <div class="text-dotted">${userName}</div>
                </div>
                <div style="flex-grow: 1">Bydlisko /mesto:
                    <div class="text-dotted">${mesto}</div>
                </div>
            </div>

            <hr style="border-top:${scaledValue(2)}px solid #000; margin: 0;">
           
            <div class="flex-container">
                <div style="width: 50%">1. hlavný rozhodca:
                    <div class="text-dotted">${
                        gameUserData.refs?.find(r => r.refType === EGameDetail.H1)?.name || ''
                    }</div>
                </div>
                <div style="width: 50%">2. hlavný rozhodca:
                    <div class="text-dotted">${
                        gameUserData.refs?.find(r => r.refType === EGameDetail.H2)?.name || ''
                    }</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 50%">1. čiarový rozhodca:
                    <div class="text-dotted">${
                        gameUserData.refs?.find(r => r.refType === EGameDetail.C1)?.name || ''
                    }</div>
                </div>
                <div style="width: 50%">2. čiarový rozhodca:
                    <div class="text-dotted">${
                        gameUserData.refs?.find(r => r.refType === EGameDetail.C2)?.name || ''
                    }</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 50%">Inštruktor rozhodcov:
                    <div class="text-dotted">${
                        gameUserData.refs?.find(r => r.refType === EGameDetail.I)?.name || ''
                    }</div>
                </div>
                <div style="width: 50%">Videobránkový rozhodca:
                    <div class="text-dotted">${
                        gameUserData.refs?.find(r => r.refType === EGameDetail.V)?.name || ''
                    }</div>
                </div>
            </div>
            
            <hr class="solid">

            <div class="flex-container">
                <div style="width: 60%">Odchod z miesta bydliska do:
                    <div class="text-dotted">${gameUserData.fromCity || ''}</div>
                </div>
                <div style="width: 25%">dňa:
                    <div class="text-dotted">${
                        gameUserData.fromDay ? getDateString(new Date(gameUserData.fromDay)) : ''
                    }</div>
                </div>
                <div style="width: 15%">o:
                    <div class="text-dotted">${gameUserData.fromTime || ''}</div>hod.
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 60%">Príchod do miesta bydliska z:
                    <div class="text-dotted">${gameUserData.toCity || ''}</div>
                </div>
                <div style="width: 25%">dňa:
                    <div class="text-dotted">${
                        gameUserData.toDay ? getDateString(new Date(gameUserData.toDay)) : ''
                    }</div>
                </div>
                <div style="width: 15%">o:
                    <div class="text-dotted">${gameUserData.toTime || ''}</div>hod.
                </div>
            </div>

            <hr class="solid">

            <div class="flex-container">
                <div style="width: 70%">Vodič:
                    <div class="text-dotted">${gameUserData.distance ? userName : ''}</div>
                </div>
                <div style="width: 30%">EČV:
                    <div class="text-dotted">${gameUserData.distance ? auto : ''}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 100%">Spolucestujúci:
                    <div class="text-dotted">${gameUserData.refsInCar?.toString() || ''}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 100%">Odkiaľ a kam – presný popis cesty tam aj späť:
                    <div class="text-dotted">${gameUserData.road || ''}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 100%">
                    <div class="text-dotted"> ...</div>
                </div>
            </div>

            <hr class="solid">

            <div class="flex-container" style="line-height: ${scaledValue(20)}pxpx">
                <div style="flex-grow: 1">(Vyplňuje len vodič !) </div>
                <div>Opakované stretnutie :
                    <strong>ANO</strong>
                    <input type="checkbox" ${gameUserData.isRepeatedGame && 'checked'} />-
                    <strong>NIE</strong>
                    <input type="checkbox" ${!gameUserData.isRepeatedGame && 'checked'} />
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 65%">V uvedený deň som rozhodoval dve stretnutia :
                    <strong>ANO</strong>
                    <input type="checkbox" ${gameUserData.isSecondGame && 'checked'} />-
                    <strong>NIE</strong>
                    <input type="checkbox" ${!gameUserData.isSecondGame && 'checked'} />
                </div>
                <div style="width: 35%">číslo druhého stretnutia:
                    <div class="text-dotted">${gameUserData.secondGame || ''}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 100%">
                    <strong>Poznámka:</strong>
                    <div class="text-dotted">${gameUserData.notes || ''}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 100%">
                    <div class="text-dotted"> ...</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width:25%; margin: 10px 20px 0px;">Paušál: EUR:
                    <div class="text-dotted">${gameUserData.rateMoney || ''}</div>
                </div>
                <div style="width: 30%; margin: 10px 20px 0px;">Počet odjazdených km:
                    <div class="text-dotted">${gameUserData.distance || ''}</div>
                </div>
            </div>
            <div class="flex-container">
                <div style="width: 25%;line-height: ${scaledValue(13)}px; font-size: ${scaledValue(
        11
    )}px; margin: 0px ${scaledValue(20)}px;">( podľa smernice)</div>
                <div style="width: 30%;line-height: ${scaledValue(13)}px; font-size: ${scaledValue(
        11
    )}px; margin: 0px ${scaledValue(20)}px;">( podľa kilometrovníka SZĽH)</div>
            </div>
            <div style="margin: ${scaledValue(5)}px ${scaledValue(10)}px ${scaledValue(20)}px">
                <div class="flex-container">
                    <div class="money-label">
                        <strong>Stravné:</strong>
                    </div>
                    <div style="width:${scaledValue(140)}px">EUR:
                        <div class="text-dotted">${gameUserData.mealMoney || ''}</div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="money-label">
                        <strong>Cestovné</strong> (Priložiť cestovné lístky alebo podľa kilometrovného!):
                    </div>
                    <div style="width:${scaledValue(140)}px">EUR:
                        <div class="text-dotted">${gameUserData.travelMoney || ''}</div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="money-label">
                        <strong>Sadzba mesto</strong> (jazda v meste):
                    </div>
                    <div style="width:${scaledValue(140)}px">EUR:
                        <div class="text-dotted">${gameUserData.rateCityMoney || ''}</div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="money-label">
                        <strong>Nocľažné</strong> (Priložiť doklady!):
                    </div>
                    <div style="width:${scaledValue(140)}px">EUR:
                        <div class="text-dotted">${gameUserData.nightMoney || ''}</div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="money-label">
                        <strong>Poštovné:</strong>
                    </div>
                    <div style="width:${scaledValue(140)}px">EUR:
                        <div class="text-dotted">${gameUserData.postMoney || ''}</div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="money-label">
                        <strong>Ostatné:</strong>
                    </div>
                    <div style="width:${scaledValue(140)}px">EUR:
                        <div class="text-dotted">${gameUserData.otherMoney || ''}</div>
                    </div>
                </div>
                <div class="flex-container">
                    <div class="money-label">
                        <strong>SPOLU</strong> (Bez sumy paušálu!):
                    </div>
                    <div style="width:${scaledValue(140)}px">EUR:
                        <div class="text-dotted">${gameUserData.togetherMoney || ''}</div>
                    </div>
                </div>
                <div class="flex-container" style="margin-top: ${scaledValue(
                    25
                )}px; flex-direction: column; align-items: flex-end">
                    <div class="text-dotted" style="border-bottom: ${scaledValue(
                        1
                    )}px solid; width: ${scaledValue(180)}pxpx; margin-right: ${scaledValue(
        10
    )}px"></div>
                    <div style="width:${scaledValue(120)}px; line-height: ${scaledValue(
        13
    )}px; font-size: ${scaledValue(11)}px; margin: 0px ${scaledValue(20)}px">Podpis účtujúceho</div>
                </div>
            </div>
            <div class="flex-container" style="margin-top: -${scaledValue(25)}px">
                <div style="width: 30%;">Kontroloval:
                    <div class="text-dotted"></div>
                </div>
                <div style="width: 15%;">dňa:
                    <div class="text-dotted"></div>
                </div>
            </div>
            <div class="flex-container" style="margin: ${scaledValue(4)}px ${scaledValue(4)}px; 
                text-align: center; font-weight: 600">
                Vyučtovanie bude spracované iba v prípade vyplnenia, doloženia originálnych príslušných dokladov a podpísania účtujúceho.
            </div>
        </div>
    `;

    const html = `
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0" />
        <style>

            @page {
                margin: 0;
                padding: 0;
            }
            html {
                height: 100%;
            }
            body {
                font-size: ${scaledValue(14)}px;
                margin: 0;
                min-height: 100%;
                overflow-x: hidden;
                font-family: 'Arial', sans-serif;
            }
        
            .wrapper {
                height: ${scaledValue(752)}px;
                width: ${scaledValue(572)}px;
                padding: ${scaledValue(20)}px;
            }

            .flex-container {
                display: flex;
                align-items: stretch;
            }
            
            .flex-container > div {
                display: flex;
                align-items: flex-start;
                margin-top: ${scaledValue(3)}px;
                text-align: left;
                font-size: ${scaledValue(13)}px;
                line-height: ${scaledValue(17)}px;
            }
            .text-dotted {
                flex-grow: 1;
                padding-left: ${scaledValue(2)}px;
                font-size: ${scaledValue(14)}px;
                height: ${scaledValue(14)}px;
                border-bottom: ${scaledValue(1)}px dotted;
            }
            .money-label {
                flex-grow: 1; 
                justify-content: flex-end;
                margin-right: ${scaledValue(40)}px
            }
            .separator {
                width: 100%;
                height: ${scaledValue(1)}px;
                background-color:black;
            }
            hr.solid {
                margin: 0;
                border-top: ${scaledValue(1)}px solid #000;
            }
        </style>
        </head>
        <body>
            ${gamePage}
            ${gamePage}
        </body>
      </html>    
    `;

    async function execute() {
        if (isWeb) {
            const pW = window.open('', '', `height=792px, width=612px`);
            pW?.document.write(html);
            pW?.document.close();
            pW?.print();
        } else {
            const { uri } = await Print.printToFileAsync({
                html: html
            });
            Sharing.shareAsync(uri);
        }
    }

    return (
        <>
            {isWeb ? (
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.button}>
                        <Button title="Generuj" onPress={() => execute()} />
                    </View>
                    <div
                        style={{ maxWidth: 612 }}
                        dangerouslySetInnerHTML={{
                            __html: html
                        }}
                    />
                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Button title="Print and Share" onPress={() => execute()} />
                    <WebView
                        source={{ html: html }}
                        scalesPageToFit={false}
                        originWhitelist={['*']}
                    />
                </View>
            )}
        </>
    );
}
