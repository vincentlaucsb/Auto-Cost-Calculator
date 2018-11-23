import * as React from "react";

export function Button(props) {
    return <button type="button" className="btn" {...props} />
}

export function DangerButton(props) {
    return <Button className="btn btn-danger" {...props} />
}