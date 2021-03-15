import { PDFDocument } from 'pdf-lib';
import { pdfBase64 } from '@strings';
import { isIos } from '@layout';
import fontkit from '@pdf-lib/fontkit';
import { decode as atob } from 'base-64';
import { EGameDetail, IGame } from './types';
import { getDateString } from './gameUtils';
import { IGameDetail } from '../screens/GameScreen';

import { robotoBase64 } from '../../assets/fonts/robot64';

const base64ToUint8Array = () => {
    var raw = atob(pdfBase64);
    var uint8Array = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) {
        uint8Array[i] = raw.charCodeAt(i);
    }
    return uint8Array;
};

interface IPDFdata {
    gameData: IGame;
    gameUserData: IGameDetail;
    mesto: string;
    auto: string;
    name: string;
}

export const getFilledPDF = async ({ gameData, gameUserData, mesto, auto, name }: IPDFdata) => {
    const bytes = base64ToUint8Array();
    const pdfDoc = await PDFDocument.load(bytes);

    pdfDoc.registerFontkit(fontkit);
    const ubuntuFont = await pdfDoc.embedFont(robotoBase64);

    const form = pdfDoc.getForm();

    const sutaz = form.getTextField('Text1');
    const cisloZ = form.getTextField('Text2');
    const datumZ = form.getTextField('Text3');
    const casZ = form.getTextField('Text4');
    const domaciT = form.getTextField('Text6');
    const hostT = form.getTextField('Text7');
    const stadion = form.getTextField('Text10');
    const mojeMeno = form.getTextField('Text11');
    const mojeMesto = form.getTextField('Text12');
    const hlavny1 = form.getTextField('Text13');
    const hlavny2 = form.getTextField('Text14');
    const ciara1 = form.getTextField('Text15');
    const ciara2 = form.getTextField('Text16');
    const instruR = form.getTextField('Text17');
    const videoR = form.getTextField('Text18');
    const odchodDo = form.getTextField('Text19');
    const odchodDna = form.getTextField('Text20');
    const odchodO = form.getTextField('Text21');
    const prichodZ = form.getTextField('Text22');
    const prichodDna = form.getTextField('Text23');
    const prichodO = form.getTextField('Text24');
    const vodic = form.getTextField('Text25');
    const ecv = form.getTextField('Text26');
    const spolucest = form.getTextField('Text27');
    const odkailK1 = form.getTextField('Text28');
    const odkailK2 = form.getTextField('Text29');
    const druhyZ = form.getTextField('Text34');
    const poznamka1 = form.getTextField('Text35');
    const poznamka2 = form.getTextField('Text36');
    const pausal = form.getTextField('Text37');
    const km = form.getTextField('Text38');
    const stravne = form.getTextField('Text39');
    const cestovne = form.getTextField('Text40');
    const sadzbaM = form.getTextField('Text41');
    const noclazne = form.getTextField('Text42');
    const postovne = form.getTextField('Text43');
    const ostatne = form.getTextField('Text44');
    const spolu = form.getTextField('Text45');

    const check5 = form.getCheckBox('checkBox5');
    gameUserData.playedBefore ? check5.check() : check5.uncheck();

    const check8 = form.getCheckBox('checkBox8');
    const check9 = form.getCheckBox('checkBox9');

    gameUserData.played ? check8.check() : check9.check();

    const check30 = form.getCheckBox('checkBox30');
    const check31 = form.getCheckBox('checkBox31');

    gameUserData.isRepeatedGame ? check30.check() : check31.check();

    const check32 = form.getCheckBox('checkBox32');
    const check33 = form.getCheckBox('checkBox33');

    gameUserData.isSecondGame ? check32.check() : check33.check();

    const dataRoad = gameUserData.road?.toString();
    const road1 = dataRoad ? dataRoad.slice(0, 36) : '';
    const road2 = road1 && dataRoad?.slice(36, 100) ? dataRoad?.slice(36, 100) : '';

    const dateNotes = gameUserData.notes;
    const notes1 = dateNotes ? dateNotes.slice(0, 48) : '';
    const notes2 = notes1 && dateNotes?.slice(48, 120) ? dateNotes?.slice(48, 120) : '';

    sutaz.setText(gameData.ligue);
    cisloZ.setText(gameData.gameId);
    datumZ.setText(gameData.date);
    casZ.setText(gameData.time);
    domaciT.setText(gameData.home);
    hostT.setText(gameData.away);
    stadion.setText(gameData.stadium);
    mojeMeno.setText(name || '');
    mojeMesto.setText(mesto || '');
    hlavny1.setText(gameUserData.refs?.find(r => r.refType === EGameDetail.H1)?.name || '');
    hlavny2.setText(gameUserData.refs?.find(r => r.refType === EGameDetail.H2)?.name || '');
    ciara1.setText(gameUserData.refs?.find(r => r.refType === EGameDetail.C1)?.name || '');
    ciara2.setText(gameUserData.refs?.find(r => r.refType === EGameDetail.C2)?.name || '');
    instruR.setText(gameUserData.refs?.find(r => r.refType === EGameDetail.I)?.name || '');
    videoR.setText(gameUserData.refs?.find(r => r.refType === EGameDetail.V)?.name || '');
    odchodDo.setText(gameUserData.fromCity || '');
    odchodDna.setText(gameUserData.fromDay ? getDateString(new Date(gameUserData.fromDay)) : '');
    odchodO.setText(gameUserData.fromTime || '');
    prichodZ.setText(gameUserData.toCity || '');
    prichodDna.setText(gameUserData.toDay ? getDateString(new Date(gameUserData.toDay)) : '');
    prichodO.setText(gameUserData.toTime || '');
    vodic.setText(gameUserData.distance ? name : '');
    ecv.setText(gameUserData.distance ? auto : '');
    spolucest.setText(gameUserData.refsInCar?.toString() || '');
    odkailK1.setText(road1);
    odkailK2.setText(road2);
    druhyZ.setText(gameUserData.secondGame || '');
    poznamka1.setText(notes1);
    poznamka2.setText(notes2);
    pausal.setText(gameUserData.rateMoney?.toString() || '');
    km.setText(gameUserData.distance?.toString() || '');
    stravne.setText(gameUserData.mealMoney?.toString() || '');
    cestovne.setText(gameUserData.travelMoney?.toString() || '');
    sadzbaM.setText(gameUserData.rateCityMoney?.toString() || '');
    noclazne.setText(gameUserData.nightMoney?.toString() || '');
    postovne.setText(gameUserData.postMoney?.toString() || '');
    ostatne.setText(gameUserData.otherMoney?.toString() || '');
    spolu.setText(gameUserData.togetherMoney?.toString() || '');

    form.updateFieldAppearances(ubuntuFont);
    !isIos && form.flatten();

    return pdfDoc;
};
