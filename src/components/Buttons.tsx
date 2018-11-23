import * as React from "react";

export function Button({ className="", ...props }) {
    let classNames = ["btn", className].join(" ");
    return <button type="button" className={classNames} {...props} />
}

export function DangerButton({ className="", ...props }) {
    let classNames = ["btn-danger", className].join(" ");
    return <Button className={classNames} {...props} />
}