// ADAPTED FROM: https://github.com/SMUsamaShah/CanvasRecorder
// CanvasRecorder.js - smusamashah
// To record canvas effitiently using MediaRecorder
// https://webrtc.github.io/samples/src/content/capture/canvas-record/

export class CanvasRecorder {
    recordedBlobs: Blob[] = [];
    supportedType?: string;
    mediaRecorder?: MediaRecorder;
    video_bits_per_sec!: number;
    stream!: MediaStream;
    video!: HTMLVideoElement;

    constructor(canvas: HTMLCanvasElement, video_bits_per_sec?: number) {
        let stream = (<any>canvas).captureStream();
        if (!stream) {
            return;
        }
        this.stream = stream;
        this.video_bits_per_sec = video_bits_per_sec || 2500000;
        this.video = document.createElement('video');
        this.video.style.display = 'none';
    }

    public startRecording() {
        let types = [
            "video/webm",
            'video/webm,codecs=vp9',
            'video/vp8',
            "video/webm\;codecs=vp8",
            "video/webm\;codecs=daala",
            "video/webm\;codecs=h264",
            "video/mpeg"
        ];

        for (let i in types) {
            if (MediaRecorder.isTypeSupported(types[i])) {
                this.supportedType = types[i];
                break;
            }
        }
        if (this.supportedType == null) {
            console.error("No supported type found for MediaRecorder");
        }
        let options: MediaRecorderOptions = {
            mimeType: this.supportedType,
            videoBitsPerSecond: this.video_bits_per_sec
        };

        this.recordedBlobs = [];
        try {
            this.mediaRecorder = new MediaRecorder(this.stream, options);
        } catch (e) {
            console.error('Exception while creating MediaRecorder:', e);
            return;
        }

        this.mediaRecorder.onstop = this.handleStop.bind(this);
        this.mediaRecorder.ondataavailable = this.handleDataAvailable.bind(this);
        this.mediaRecorder.start(100); // collect 100ms of data blobs
        console.log('MediaRecorder started', this.mediaRecorder);
    }

    private handleDataAvailable(event: BlobEvent) {
        if (event.data && event.data.size > 0) {
            this.recordedBlobs.push(event.data);
        }
    }

    private handleStop(event: Event) {
        console.log('MediaRecorder stopped: ', event);
        const superBuffer = new Blob(this.recordedBlobs, { type: this.supportedType });
        this.video.src = window.URL.createObjectURL(superBuffer);
    }

    public stopRecording() {
        this.mediaRecorder!.stop();
        this.video.controls = true;
    }

    public download(file_name: string) {
        const name = file_name || 'recording.webm';
        const blob = new Blob(this.recordedBlobs, { type: this.supportedType });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
}