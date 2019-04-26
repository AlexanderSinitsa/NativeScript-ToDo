import { fromObject, Observable } from 'tns-core-modules/data/observable';
import { isAndroid, isIOS } from 'tns-core-modules/platform';
import * as nsApp from 'tns-core-modules/application';
import * as utils from 'tns-core-modules/utils/utils';

export class KeyboardUtil {
    private callBack: android.view.ViewTreeObserver.OnGlobalLayoutListener;
    private activity: android.app.Activity;
    private keyboardActive: boolean;
    private events: Observable;

    public constructor(activity: android.app.Activity) {
        if (isIOS) {
            throw new Error(
                'Currently no implementation for iOS; should only be constructed for Android.'
            );
        }
        this.activity = activity;
        this.events = fromObject({});
    }

    public start() {
        const rootView = this.activity
            .getWindow()
            .getDecorView()
            .getRootView();
        this.callBack = new android.view.ViewTreeObserver.OnGlobalLayoutListener({
            onGlobalLayout: (): void => {
                const rect = new android.graphics.Rect();
                rootView.getWindowVisibleDisplayFrame(rect);
                const screenHeight = rootView.getHeight();
                const keyboardHeight = screenHeight - (rect.bottom - rect.top);
                console.log('keyboardHeight=>', keyboardHeight);
                const orientation = this.activity.getResources().getConfiguration()
                    .orientation;
                if (keyboardHeight > screenHeight / 3) {
                    this.keyboardActive = true;
                    if (
                        orientation ===
                        android.content.res.Configuration.ORIENTATION_PORTRAIT
                    ) {
                        this.notifyKeyboardHeightChanged(keyboardHeight, orientation);
                    } else {
                        this.notifyKeyboardHeightChanged(keyboardHeight, orientation);
                    }
                } else {
                    if (this.keyboardActive) {
                        this.notifyKeyboardHeightChanged(0, orientation);
                        this.keyboardActive = false;
                    }
                }
            }
        });
        rootView.getViewTreeObserver().addOnGlobalLayoutListener(this.callBack);
    }

    public stop() {
        const rootView = this.activity
            .getWindow()
            .getDecorView()
            .getRootView();
        rootView.getViewTreeObserver().removeGlobalOnLayoutListener(this.callBack);
    }

    private notifyKeyboardHeightChanged(height, orientation) {
        this.events.notify({
            eventName: 'heightChanged',
            object: fromObject({
                height,
                orientation
            })
        });
    }
}

// How use
if (isAndroid) {
    this._kbs = new KeyboardUtil(nsApp.android.startActivity);
    this._kbs.events.on('heightChanged', args => {
        const height = args.object.get('height');
        console.log(height, '---->');
        this.keyboardHeight = utils.layout.toDeviceIndependentPixels(height);
        // this._adjustScrollHeight(height);
    });
    this._kbs.start();

}
